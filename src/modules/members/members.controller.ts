import {
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  Query,
  Post,
  Body,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from 'src/entities/member.entity';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/supports/helpers';
@ApiTags('members')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Get()
  @ApiOkResponse({ description: 'List all member' })
  getMembers(
    @Query() getListMembersDto: GetListMembersDto,
  ): Promise<PageResponseDto<Member>> {
    return this.membersService.getMembers(getListMembersDto);
  }

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 20 * 1024 * 1024 /* 20MB */ },
      fileFilter: imageFileFilter,
    }),
  )
  async createMember(
    @Body() body: CreateMemberDto,
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.membersService.createMember(body, avatar);
  }

}
