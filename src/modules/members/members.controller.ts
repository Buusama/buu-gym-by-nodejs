import {
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from 'src/entities/member.entity';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';

@ApiTags('members')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOkResponse({ description: 'List all member' })
  getMembers(
    @Query() getListMembersDto: GetListMembersDto,
  ): Promise<PageResponseDto<Member>> {
    return this.membersService.getMembers(getListMembersDto);
  }
}
