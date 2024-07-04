import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleValue } from '../../commons/enums/role-enum';
import { Member } from '../../entities/member.entity';
import { Staff } from '../../entities/staff.entity';
import { Trainer } from '../../entities/trainer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    private jwtService: JwtService,
  ) { }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string; user: any }> {
    const { email, password } = authCredentialsDto;

    // Find user by email
    const user = await this.usersRepository.findOneBy({ email });

    // If user not found, throw unauthorized exception
    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    // Determine user role
    let role: RoleValue;
    const member = await this.membersRepository.findOneBy({ user_id: user.id });
    const staff = await this.staffRepository.findOneBy({ user_id: user.id });
    const trainer = staff
      ? await this.trainerRepository.findOneBy({ staff_id: staff.id })
      : null;

    if (member) {
      role = RoleValue.MEMBER;
    } else if (trainer) {
      role = RoleValue.TRAINER;
    } else if (staff) {
      role = RoleValue.STAFF;
    } else {
      role = RoleValue.ADMIN;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid or user's role is not MEMBER or TRAINER, throw unauthorized exception
    if (
      !isPasswordValid ||
      ![RoleValue.STAFF, RoleValue.ADMIN].includes(role)
    ) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    // Generate access token
    const payload: AuthPayload = {
      id: user.id,
      email: user.email,
    };
    const accessToken: string = await this.jwtService.sign(payload, { expiresIn: '1d' });

    // Prepare user info
    const userInfo: any = {
      id: user.id,
      email: user.email,
      name: user.name,
      role,
      avatar: user.avatar,
    };

    // Return access token and user info
    return { access_token: accessToken, user: userInfo };
  }

  async signInMachingSite(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string; user: any }> {
    const { email, password } = authCredentialsDto;

    // Find user by email
    const user = await this.usersRepository.findOneBy({ email });

    // If user not found, throw unauthorized exception
    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    // Determine user role
    let role: RoleValue;
    const member = await this.membersRepository.findOneBy({ user_id: user.id });
    const staff = await this.staffRepository.findOneBy({ user_id: user.id });
    const trainer = staff
      ? await this.trainerRepository.findOneBy({ staff_id: staff.id })
      : null;

    if (member) {
      role = RoleValue.MEMBER;
    } else if (trainer) {
      role = RoleValue.TRAINER;
    } else if (staff) {
      role = RoleValue.STAFF;
    } else {
      role = RoleValue.ADMIN;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid or user's role is not MEMBER or TRAINER, throw unauthorized exception
    if (
      !isPasswordValid ||
      ![RoleValue.MEMBER, RoleValue.TRAINER].includes(role)
    ) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    // Generate access token
    const payload: AuthPayload = {
      id: user.id,
      email: user.email,
    };
    const accessToken: string = await this.jwtService.sign(payload);

    // Prepare user info
    const userInfo: any = {
      id: user.id,
      email: user.email,
      name: user.name,
      role,
      avatar: user.avatar,
    };

    // Return access token and user info
    return { access_token: accessToken, user: userInfo };
  }

  async getProfile(user: User): Promise<User> {
    return user
  }
}
