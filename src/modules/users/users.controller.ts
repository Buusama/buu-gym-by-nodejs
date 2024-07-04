import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  UseGuards,
  Query,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetListUsersDto } from './dto/get-list-users.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../../supports/helpers';

@ApiTags('users')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'List all users' })
  getUsers(
    @Query() getListUsersDto: GetListUsersDto,
  ): Promise<PageResponseDto<User>> {
    return this.usersService.getUsers(getListUsersDto);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Show user detail' })
  getUserById(@Param('id') id: number): Promise<PageResponseDto<User>> {
    return this.usersService.getUserById(id);
  }

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 20 * 1024 * 1024 /* 20MB */ },
      fileFilter: imageFileFilter,
    }),
  )
  createTask(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: any,
  ): Promise<PageResponseDto<User>> {
    return this.usersService.createUser(createUserDto, avatar);
  }
}
