import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { MemberStatusValue } from '../../commons/enums/members/member-status';
import { BodyMeasurement } from '../../entities/body-measurement.entity';
import { MemberMembership } from '../../entities/member-membership.entity';
import { Member } from '../../entities/member.entity';
import { Repository } from 'typeorm';
import { MembershipPlan } from '../../entities/membership-plan.entity';
import { User } from '../../entities/user.entity';
import { AwsService } from '../aws/aws.service';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import {
  CreateMemberMembershipsDto,
  createMemberMembershipPaymentDto,
} from './dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembershipPayment } from '../../entities/membership-payment.entity';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionValue } from '../../commons/enums/payments/transaction';

@Injectable()
export class MembersService extends PageService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private s3Service: AwsService,
    @InjectRepository(MemberMembership)
    private memberMembershipRepository: Repository<MemberMembership>,
    @InjectRepository(MembershipPayment)
    private membershipPaymentRepository: Repository<MembershipPayment>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {
    super();
  }
  async getById(memberId: number) {
    return this.membersRepository
      .findOneByOrFail({ id: memberId })
      .then((response) => new PageResponseDto(response));
  }


  async getMembers(
    getListMembersDto: GetListMembersDto,
  ): Promise<PageResponseDto<Member>> {
    const queryBuilder = await this.paginate(
      this.membersRepository,
      getListMembersDto,
    );
    queryBuilder
      .select([
        'table.id AS MemberId',
        'table.start_date AS StartDate',
        'table.end_date AS EndDate',
        'P.name AS MemberName',
        'P.email AS MemberEmail',
        'P.phone AS MemberPhone',
        'P.address AS MemberAddress',
        'P.avatar AS MemberAvatar',
        'P.birth_date AS MemberBirthDate',
        'P.gender AS MemberGender',
        'MP.name AS PackageName',
      ])
      .leftJoin(User, 'P', 'table.user_id = P.id')
      .leftJoin(MembershipPlan, 'MP', 'table.membership_plan_id = MP.id');

    if (getListMembersDto.status === MemberStatusValue.ACTIVE) {
      queryBuilder.andWhere('table.end_date > :currentDate', {
        currentDate: new Date(),
      });
    } else if (getListMembersDto.status === MemberStatusValue.INACTIVE) {
      queryBuilder.andWhere('table.end_date < :currentDate', {
        currentDate: new Date(),
      });
    } else if (getListMembersDto.status === MemberStatusValue.EXPIRING) {
      queryBuilder.andWhere('table.end_date > :currentDate', {
        currentDate: new Date(),
      });
      queryBuilder.andWhere('table.end_date < :expiringDate', {
        expiringDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
      });
    }

    if (
      getListMembersDto.field &&
      getListMembersDto.type &&
      getListMembersDto.value
    ) {
      if (getListMembersDto.type === 'like') {
        getListMembersDto.value = `%${getListMembersDto.value}%`;
      }
      queryBuilder.andWhere(
        `P.${getListMembersDto.field} ${getListMembersDto.type} :value`,
        { value: getListMembersDto.value },
        // `P.${getListMembersDto.field} ${getListMembersDto.type} :value`,
        // { value: getListMembersDto.value },
      );
    }

    const itemCount = await queryBuilder.getCount();
    let entities = await queryBuilder.getRawMany().then((response) => {
      response.forEach((entity) => {
        if (entity.EndDate < new Date())
          entity.Status = MemberStatusValue.INACTIVE;
        else if (
          entity.EndDate <
          new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
        )
          entity.Status = MemberStatusValue.EXPIRING;
        else entity.Status = MemberStatusValue.ACTIVE;
        entity.MemberBirthDate = moment(entity.MemberBirthDate).format(
          'YYYY-MM-DD',
        );
        entity.EndDate = moment(entity.EndDate).format('YYYY-MM-DD');
        entity.StartDate = moment(entity.StartDate).format('YYYY-MM-DD');
      });
      return response;
    });
    const pageMeta = new PageMetaDto(getListMembersDto, itemCount);

    // PAGINATION
    if (pageMeta.page >= 0 && pageMeta.take >= 0)
      entities = entities.slice(
        pageMeta.take * pageMeta.page,
        pageMeta.take * (pageMeta.page + 1),
      );
    return new PageResponseDto(entities, pageMeta);
  }

  async uploadAvatar(
    memberId: number,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const uploadResult = await this.s3Service.uploadFile(
        file.originalname,
        file.buffer,
        file.mimetype,
        `Avatar/${memberId}/images`,
      );
      return uploadResult;
    } catch (error) {
      throw error;
    }
  }

  async createMember(memberDto: CreateMemberDto, avatar: Express.Multer.File) {
    try {
      const { ...params } = memberDto;
      const user = this.userRepository.create({
        ...params,
      });
      await this.userRepository.save(user);

      if (avatar) {
        const image = await this.uploadAvatar(user.id, avatar);
        user.avatar = image.Location;
        await this.userRepository.save(user);
      }

      const member = this.membersRepository.create({
        user_id: user.id,
        start_date: new Date(),
        end_date: new Date(),
        membership_plan_id: 0,
      });
      await this.membersRepository.save(member);

      return await this.getById(member.id);
    } catch (error) {
      throw new Error(`Failed to create member: ${error.message}`);
    }
  }

  async getMemberById(memberId: number) {
    return await this.membersRepository.findOneByOrFail({
      id: memberId,
    });
  }

  async updateMember(
    memberId: number,
    updateMemberDto: UpdateMemberDto,
    avatar: Express.Multer.File,
  ) {
    const existingMember = await this.getMemberById(memberId);
    const { ...params } = updateMemberDto;
    const user = await this.userRepository.findOneByOrFail({
      id: existingMember.user_id,
    });

    if (avatar) {
      const image = await this.uploadAvatar(user.id, avatar);
      user.avatar = image.Location;
      await this.userRepository.save(user);
    }

    this.userRepository.merge(user, params);
    await this.userRepository.save(user);

    this.membersRepository.merge(existingMember, params);
    await this.membersRepository.save(existingMember);
  }

  async getMember(memberId: number): Promise<PageResponseDto<Member>> {
    return this.membersRepository
      .createQueryBuilder('member')
      .select([
        'member.id AS MemberId',
        'member.start_date AS StartDate',
        'member.end_date AS EndDate',
        'P.name AS MemberName',
        'P.gender AS MemberGender',
        'P.email AS MemberEmail',
        'P.phone AS MemberPhone',
        'P.address AS MemberAddress',
        'P.avatar AS MemberAvatar',
        'P.birth_date AS MemberBirthDate',
        'MP.name AS PackageName',
      ])
      .leftJoin('member.user', 'P')
      .leftJoin('member.membership_plan', 'MP')

      .where('member.id = :memberId', { memberId })
      .getRawOne()
      .then((response) => {
        response.MemberBirthDate = moment(response.MemberBirthDate).format(
          'YYYY-MM-DD',
        );
        response.EndDate = moment(response.EndDate).format('YYYY-MM-DD');
        response.StartDate = moment(response.StartDate).format('YYYY-MM-DD');
        return new PageResponseDto(response);
      });
  }

  async destroyMember(memberId: number) {
    const member: Member = await this.membersRepository.findOneByOrFail({
      id: memberId,
    });

    await this.membersRepository.remove(member);
    return { message: 'Delete member successfully' };
  }

  async getMemberMembershipPlans(memberId: number) {
    return this.memberMembershipRepository
      .createQueryBuilder('member_membership')
      .select([
        'member_membership.id AS  id',
        'MP.name AS name',
        'MP.price AS price',
        'member_membership.start_date AS date',
        'member_membership.note AS note',
      ])
      .innerJoin(
        MembershipPlan,
        'MP',
        'member_membership.membership_plan_id = MP.id',
      )
      .where('member_membership.member_id = :memberId', { memberId })
      .getRawMany()
      .then((response) => {
        response.forEach((entity) => {
          entity.date = moment(entity.date).format('YYYY-MM-DD');
        });
        return new PageResponseDto(response);
      });
  }

  async createMemberMembershipPlan(
    memberId: number,
    membershipPlan: CreateMemberMembershipsDto,
  ) {
    const member = await this.membersRepository.findOneByOrFail({
      id: memberId,
    });
    const membership = this.memberMembershipRepository.create({
      member_id: member.id,
      ...membershipPlan,
    });

    await this.memberMembershipRepository.save(membership);

    member.end_date = this.calculateEndDate(
      membership.start_date,
      membership.membership_plan_id,
    );
    member.membership_plan_id = membership.membership_plan_id;
    await this.membersRepository.save(member);

    return this.getMemberMembershipPlans(memberId);
  }

  private calculateEndDate(startDate: Date, membership_plan_id: number): Date {
    const endDate = new Date(startDate);
    const monthsToAdd = this.getMonthsToAddForPlan(membership_plan_id);
    endDate.setMonth(endDate.getMonth() + monthsToAdd);
    return endDate;
  }

  private getMonthsToAddForPlan(planId: number): number {
    switch (planId) {
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 6;
      case 4:
        return 12;
      default:
        return 0;
    }
  }

  async getMemberMembershipPayments(memberId: number) {
    return this.membershipPaymentRepository
      .createQueryBuilder('membership_payment')
      .select([
        'membership_payment.id AS id',
        'membership_payment.payment_date AS payment_date',
        'membership_payment.payment_amount AS payment_amount',
        'membership_payment.payment_type AS payment_type',
      ])
      .where('membership_payment.member_id = :memberId', { memberId })
      .getRawMany()
      .then((response) => {
        response.forEach((entity) => {
          entity.payment_date = moment(entity.payment_date).format(
            'YYYY-MM-DD',
          );
        });
        return new PageResponseDto(response);
      });
  }

  async createMemberMembershipPayment(
    memberId: number,
    membershipPayment: createMemberMembershipPaymentDto,
  ) {
    try {
      const member = await this.membersRepository.findOneByOrFail({
        id: memberId,
      });
      // create transaction with type = 'payment'
      const transaction = this.transactionRepository.create({
        type: TransactionValue.MEMBERSHIP,
        date: membershipPayment.payment_date,
        amount: membershipPayment.payment_amount,
      });
      await this.transactionRepository.save(transaction);

      const payment = this.membershipPaymentRepository.create({
        member_id: member.id,
        transaction_id: transaction.id,
        ...membershipPayment,
      });

      await this.membershipPaymentRepository.save(payment);
      return this.getMemberMembershipPayments(memberId);
    } catch (error) {
      throw Error('Error occurred while creating payment');
    }
  }

  async getMemberFinancials(memberId: number) {
    // get Sales: doanh số, Revenue: doanh thu,  Receivable: phải thu
    // sales = revenue + receivable
    const sales = await this.memberMembershipRepository
      .createQueryBuilder('member_membership')
      .select(['SUM(MP.price) AS sales'])
      .innerJoin(
        MembershipPlan,
        'MP',
        'member_membership.membership_plan_id = MP.id',
      )
      .where('member_membership.member_id = :memberId', { memberId })
      .getRawOne();

    const revenue = await this.membershipPaymentRepository
      .createQueryBuilder('membership_payment')
      .select(['SUM(membership_payment.payment_amount) AS revenue'])
      .where('membership_payment.member_id = :memberId', { memberId })
      .getRawOne();

    const receivable = sales.sales - revenue.revenue;

    return new PageResponseDto({
      total_sales: sales.sales,
      total_revenue: revenue.revenue,
      total_receivable: receivable,
    });
  }

  async getMemberBodyMeasurements(memberId: number) {
    return this.membersRepository
      .createQueryBuilder('member')
      .select([
        'BM.id AS id',
        'BM.measurement_date AS measurement_date',
        'BM.height AS height',
        'BM.weight AS weight',
        'BM.fat AS fat',
        'BM.muscle AS muscle',
        'BM.bone AS bone',
        'BM.waist AS waist',
        'BM.hip AS hip',
        'BM.chest AS chest',
      ])
      .innerJoin(BodyMeasurement, 'BM', 'BM.member_id = member.id')
      .where('member.id = :memberId', { memberId })
      .getRawMany()
      .then((response) => {
        response.forEach((entity) => {
          entity.measurement_date = moment(entity.measurement_date).format(
            'YYYY-MM-DD',
          );
        });
        return new PageResponseDto(response);
      });
  }
}
