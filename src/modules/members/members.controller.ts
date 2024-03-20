import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Member } from 'src/entities/member.entity';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';
import { imageFileFilter } from 'src/supports/helpers';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { MembersService } from './members.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

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
    @Body() createMemberDto: CreateMemberDto,
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.membersService.createMember(createMemberDto, avatar);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 20 * 1024 * 1024 /* 20MB */ },
      fileFilter: imageFileFilter,
    }),
  )
  @Put(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  async update(
    @Param('id') member_id: string,
    @Body() updateMemberDto: UpdateMemberDto,
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.membersService.updateMember(
      Number(member_id),
      updateMemberDto,
      avatar,
    );
  }

  @Get(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  async getMember(@Param('id') member_id: string) {
    return this.membersService.getMember(Number(member_id));
  }

  @Delete(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  async destroyMember(@Param('id') member_id: string) {
    return this.membersService.destroyMember(Number(member_id));
  }
}
