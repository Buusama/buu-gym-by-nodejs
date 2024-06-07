import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { UserInRequest } from 'src/commons/decorators/user-in-request.decorator';
import { RoleValue } from 'src/commons/enums/role-enum';
import { Member } from 'src/entities/member.entity';
import { User } from 'src/entities/user.entity';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';
import { RoleGuard } from 'src/modules/auth/guard/role.guard';
import { imageFileFilter } from 'src/supports/helpers';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersService } from './members.service';
import { CreateMemberMembershipsDto, createMemberMembershipPaymentDto } from './dto';

@ApiTags('members')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('members')
@UseGuards(RoleGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOkResponse({ description: 'List all member' })
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER)
  getMembers(
    @Query() getListMembersDto: GetListMembersDto,
    @UserInRequest() user: User,
  ): Promise<PageResponseDto<Member>> {
    return this.membersService.getMembers(getListMembersDto, user);
  }

  @ApiConsumes('multipart/form-data')
  @Post()
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
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
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
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
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER)
  @UseFilters(EntityNotFoundErrorFilter)
  async getMember(@Param('id') member_id: string) {
    return this.membersService.getMember(Number(member_id));
  }

  @Delete(':id')
  @RequireRole(RoleValue.ADMIN)
  @UseFilters(EntityNotFoundErrorFilter)
  async destroyMember(@Param('id') member_id: string) {
    return this.membersService.destroyMember(Number(member_id));
  }

  @Get(':id/membership-plans')
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
  @UseFilters(EntityNotFoundErrorFilter)
  async getMembershipPlans(@Param('id') member_id: string) {
    return this.membersService.getMemberMembershipPlans(Number(member_id));
  }

  @Post(':id/membership-plans')
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
  @UseFilters(EntityNotFoundErrorFilter)
  async createMembershipPlan(
    @Param('id') member_id: string,
    @Body() membershipPlan: CreateMemberMembershipsDto,
  ) {
    return this.membersService.createMemberMembershipPlan(
      Number(member_id),
      membershipPlan,
    );
  }

  @Get(':id/membership-payments')
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
  @UseFilters(EntityNotFoundErrorFilter)
  async getMembershipPayments(@Param('id') member_id: string) {
    return this.membersService.getMemberMembershipPayments(Number(member_id));
  }

  @Post(':id/membership-payments')
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
  @UseFilters(EntityNotFoundErrorFilter)
  async createMembershipPayment(
    @Param('id') member_id: string,
    @Body() membershipPayment: createMemberMembershipPaymentDto,
  ) {
    return this.membersService.createMemberMembershipPayment(
      Number(member_id),
      membershipPayment,
    );
  }

  @Get(':id/financials')
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
  @UseFilters(EntityNotFoundErrorFilter)
  async getFinancials(@Param('id') member_id: string) {
    return this.membersService.getMemberFinancials(Number(member_id));
  }

  @Get(':id/measurements')
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
  @UseFilters(EntityNotFoundErrorFilter)
  async getBodyMeasurements(@Param('id') member_id: string) {
    return this.membersService.getMemberBodyMeasurements(Number(member_id));
  }
}
