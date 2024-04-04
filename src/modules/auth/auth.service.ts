import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleValue } from 'src/commons/enums/role-enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string; user: any }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: AuthPayload = {
        id: user.id,
        email: user.email,
      };

      const accessToken: string = await this.jwtService.sign(payload);
      const UserInfo: any = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      };
      return { access_token: accessToken, user: UserInfo };
    } else {
      throw new UnauthorizedException('Please check');
    }
  }

  async signInMachingSite(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string; user: any }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ email, role: RoleValue.MEMBER }) ||
      await this.usersRepository.findOneBy({ email, role: RoleValue.TRAINER });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: AuthPayload = {
        id: user.id,
        email: user.email,
      };

      const accessToken: string = await this.jwtService.sign(payload);
      const UserInfo: any = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      };
      return { access_token: accessToken, user: UserInfo };
    } else {
      throw new UnauthorizedException('Please check');
    }
  }


  async getProfile(user: User): Promise<User> {
    return user;
  }
}
