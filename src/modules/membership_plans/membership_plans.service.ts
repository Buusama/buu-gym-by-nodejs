import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { MembershipPlan } from '../../entities/membership-plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetListMembershipPlansDto } from './dto/get-list-membersip_plans.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { CreateMembershipPlanDto } from './dto/create-membership_plan.dto';

@Injectable()
export class MembershipPlansService extends PageService {
  constructor(
    @InjectRepository(MembershipPlan)
    private membershipPlansRepository: Repository<MembershipPlan>,
  ) {
    super();
  }

  async getMembershipPlans(
    getListMembershipPlansDto: GetListMembershipPlansDto,
  ): Promise<PageResponseDto<MembershipPlan>> {
    const queryBuilder = await this.paginate(
      this.membershipPlansRepository,
      getListMembershipPlansDto,
    );

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto(getListMembershipPlansDto, itemCount);
    return new PageResponseDto(entities, pageMeta);
  }

  async createMembershipPlan(
    createMembershipPlanDto: CreateMembershipPlanDto,
  ): Promise<PageResponseDto<MembershipPlan>> {
    const newMembershipPlan = new MembershipPlan();
    const { ...params } = createMembershipPlanDto;
    Object.assign(newMembershipPlan, params);
    await this.membershipPlansRepository.save(newMembershipPlan);
    return new PageResponseDto(newMembershipPlan);
  }

  async getMembershipPlan(
    id: number,
  ): Promise<PageResponseDto<MembershipPlan>> {
    return this.membershipPlansRepository
      .findOneByOrFail({ id: id })
      .then((response) => new PageResponseDto(response));
  }

  async updateMembershipPlan(
    id: number,
    updateMembershipPlanDto: CreateMembershipPlanDto,
  ): Promise<PageResponseDto<MembershipPlan>> {
    const existingMembershipPlan =
      await this.membershipPlansRepository.findOneByOrFail({
        id: id,
      });
    const { ...params } = updateMembershipPlanDto;

    this.membershipPlansRepository.merge(existingMembershipPlan, params);
    await this.membershipPlansRepository.save(existingMembershipPlan);
    return this.getMembershipPlan(id);
  }

  async deleteMembershipPlan(
    id: number,
  ): Promise<PageResponseDto<MembershipPlan>> {
    const existingMembershipPlan =
      await this.membershipPlansRepository.findOneByOrFail({
        id: id,
      });

    const deletedMembershipPlan = await this.membershipPlansRepository.remove(
      existingMembershipPlan,
    );
    this.membershipPlansRepository.save(deletedMembershipPlan);
    return new PageResponseDto(existingMembershipPlan);
  }
}
