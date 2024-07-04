import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import {
  AuthCredentialsDto,
  AuthMatchingCredentialsDto,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { PublicRoute } from '../../commons/decorators/public-route.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from './guard/role.guard';
import { User } from '../../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @PublicRoute()
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/login-matching')
  @PublicRoute()
  signInMachingSite(
    @Body() authCredentialsDto: AuthMatchingCredentialsDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signInMachingSite(authCredentialsDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard)
  @Get('/profile')
  getProfile(@Req() req): Promise<User> {
    return this.authService.getProfile(req.user);
  }
}
