import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthPayload } from '../interfaces/auth-payload.interface';
import { User } from '../../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleValue } from '../../../commons/enums/role-enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'at-jwt') {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'sample',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(authPayload: AuthPayload): Promise<User> {
    const { email } = authPayload;
    const user: User = await this.usersRepository.findOne({
      where: { email },
      relations: ['member', 'staff', 'staff.trainer'],
    });
    const member = user.member;
    const staff = user.staff;
    const trainer = staff ? staff.trainer : null;

    if (member) {
      user.role = RoleValue.MEMBER;
    } else if (trainer) {
      user.role = RoleValue.TRAINER;
    } else if (staff) {
      user.role = RoleValue.STAFF;
    } else {
      user.role = RoleValue.ADMIN;
    }

    if (!user) {
      throw new UnauthorizedException('fails');
    }

    return user;
  }
}
