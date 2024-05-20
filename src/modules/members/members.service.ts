import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleValue } from 'src/commons/enums/role-enum';
import { Member } from 'src/entities/member.entity';
import { Repository } from 'typeorm';
import { MembershipPlan } from '../../entities/membership-plan.entity';
import { Staff } from '../../entities/staff.entity';
import { Trainer } from '../../entities/trainer.entity';
import { User } from '../../entities/user.entity';
import { AwsService } from '../aws/aws.service';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { BodyMeasurement } from 'src/entities/body-measurement.entity';
import * as moment from 'moment';
import { MemberStatusValue } from 'src/commons/enums/members/member-status';

@Injectable()
export class MembersService extends PageService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private s3Service: AwsService,
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
    user: User,
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
      .innerJoin(User, 'P', 'table.user_id = P.id')
      .innerJoin(MembershipPlan, 'MP', 'table.membership_plan_id = MP.id');

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
      ...params,
    });

    await this.membersRepository.save(member);
    return this.getById(member.id);
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
        'P.name AS MemberName',
        'P.gender AS MemberGender',
        'P.email AS MemberEmail',
        'P.phone AS MemberPhone',
        'P.address AS MemberAddress',
        'P.avatar AS MemberAvatar',
        'P.birth_date AS MemberBirthDate',
        'MP.name AS PackageName',
        'BM.measurement_date',
        'BM.height',
        'BM.weight',
      ])
      .innerJoin(User, 'P', 'member.user_id = P.id')
      .innerJoin(MembershipPlan, 'MP', 'member.membership_plan_id = MP.id')
      .leftJoin(BodyMeasurement, 'BM', 'BM.member_id = member.id')
      .where('member.id = :memberId', { memberId })
      .getRawOne()
      .then((response) => {
        response.MemberBirthDate = moment(response.MemberBirthDate).format(
          'YYYY-MM-DD',
        );
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
}
