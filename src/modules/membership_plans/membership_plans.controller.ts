import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MembershipPlansService } from './membership_plans.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { GetListMembershipPlansDto } from './dto/get-list-membersip_plans.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { MembershipPlan } from '../../entities/membership-plan.entity';
import { CreateMembershipPlanDto } from './dto/create-membership_plan.dto';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';
import { RoleGuard } from '../auth/guard/role.guard';
import { RequireRole } from '../../commons/decorators/require-role.decorator';
import { RoleValue } from '../../commons/enums/role-enum';

@ApiTags('membership_plans')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(RoleGuard)
@Controller('membership_plans')
export class MembershipPlansController {
  constructor(private readonly membershipPlanService: MembershipPlansService) {}
  @Get()
  @RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
  @ApiOkResponse({ description: 'List all package' })
  getMembershipPlans(
    @Query() getListMembershipPlansDto: GetListMembershipPlansDto,
  ): Promise<PageResponseDto<MembershipPlan>> {
    return this.membershipPlanService.getMembershipPlans(
      getListMembershipPlansDto,
    );
  }

  @Post()
  @ApiOkResponse({ description: 'Create membership plan' })
  createMembershipPlan(
    @Body() createMembershipPlanDto: CreateMembershipPlanDto,
  ): Promise<PageResponseDto<MembershipPlan>> {
    return this.membershipPlanService.createMembershipPlan(
      createMembershipPlanDto,
    );
  }

  @Get(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get membership plan by id' })
  async getMembershipPlan(
    @Param('id') id: string,
  ): Promise<PageResponseDto<MembershipPlan>> {
    return this.membershipPlanService.getMembershipPlan(+id);
  }

  @Put(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Update membership plan by id' })
  async updateMembershipPlan(
    @Param('id') id: string,
    @Body() updateMembershipPlanDto: CreateMembershipPlanDto,
  ): Promise<PageResponseDto<MembershipPlan>> {
    return this.membershipPlanService.updateMembershipPlan(
      +id,
      updateMembershipPlanDto,
    );
  }

  @Delete(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Delete membership plan by id' })
  async deleteMembershipPlan(
    @Param('id') id: string,
  ): Promise<PageResponseDto<MembershipPlan>> {
    return this.membershipPlanService.deleteMembershipPlan(+id);
  }
}
