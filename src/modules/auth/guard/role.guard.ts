import { RoleValue } from '../../../commons/enums/role-enum';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleValue[]>(
      'requireRoles',
      [context.getHandler(), context.getClass()],
    );

    const { user } = context.switchToHttp().getRequest();

    let userRole: RoleValue;
    const member = user.member;
    const staff = user.staff;
    const trainer = staff ? staff.trainer : null;

    if (member) {
      userRole = RoleValue.MEMBER;
    } else if (trainer) {
      userRole = RoleValue.TRAINER;
    } else if (staff) {
      userRole = RoleValue.STAFF;
    } else {
      userRole = RoleValue.ADMIN;
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!roles || userRole === RoleValue.ADMIN) {
      return true;
    }

    if (roles.includes(userRole)) {
      return true;
    }

    throw new ForbiddenException('User does not have the necessary roles');
  }
}
