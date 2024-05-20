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
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!roles || user.role === RoleValue.ADMIN) {
      return true;
    }

    if (roles.includes(user.role)) {
      return true;
    }
    // return true;

    throw new ForbiddenException('User does not have the necessary roles');
  }
}
