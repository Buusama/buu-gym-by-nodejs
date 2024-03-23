import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleValue } from 'src/commons/enums/role-enum';
import { Member } from 'src/entities/member.entity';
import { Repository } from 'typeorm';
import { Package } from '../../entities/package.entity';
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
import moment from 'moment';

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
    const queryBuilder = await this.membersRepository.createQueryBuilder('table');
    queryBuilder
      .select([
        'table.id AS MemberId',
        'P.name AS MemberName',
        'P.email AS MemberEmail',
        'P.phone AS MemberPhone',
        'P.address AS MemberAddress',
        'P.avatar AS MemberAvatar',
        'P.birth_date AS MemberBirthDate',
        'P.gender AS MemberGender',
        'MP.name AS PackageName',
        'PT.id AS TrainerId',
        'TR.name AS TrainerName',
        'TR.id AS TrainerId',
      ])
      .innerJoin(User, 'P', 'table.user_id = P.id')
      .innerJoin(Package, 'MP', 'table.package_id = MP.id')

      .innerJoin(Trainer, 'PT', 'table.trainer_id = PT.id')
      .leftJoin(Staff, 'ST', 'PT.staff_id = ST.id')
      .leftJoin(User, 'TR', 'ST.user_id = TR.id');
    // .orderBy('table.id', 'DESC');

    if (user.role === RoleValue.TRAINER) {
      queryBuilder.andWhere('TR.id = :userId', { userId: user.id });
    }


    if (getListMembersDto.sort_by && getListMembersDto.sort_enum) {
      queryBuilder.addOrderBy(`P.${getListMembersDto.sort_by}`, getListMembersDto.sort_enum);
    }

    if (getListMembersDto.skip !== null && getListMembersDto.take !== null) {
      queryBuilder.offset(getListMembersDto.skip).limit(getListMembersDto.take);
    }

    // if (getListMembersDto.status) {
    //   queryBuilder.andWhere('table.status = :status', {
    //     status: getListMembersDto.status,
    //   });
    // }
    if (getListMembersDto.status === 1) {
      queryBuilder.andWhere('table.end_date > CURRENT_DATE');
    }
    if (getListMembersDto.status === 2) {
      queryBuilder.andWhere('table.end_date < CURRENT_DATE');
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
    const entities = await queryBuilder.getRawMany();
    const pageMeta = new PageMetaDto(getListMembersDto, itemCount);
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
    console.log('params', params);
    const user = this.userRepository.create({
      ...params,
      role: RoleValue.MEMBER,
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

    await this.membersRepository.update(existingMember.id, params);
    return this.getById(existingMember.id);
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
        'PT.specialization AS TrainerSpecialization',
        'TR.name AS TrainerName',
        'BM.measurement_date',
        'BM.height',
        'BM.weight',
      ])
      .innerJoin(User, 'P', 'member.user_id = P.id')
      .innerJoin(Package, 'MP', 'member.package_id = MP.id')
      .leftJoin(Trainer, 'PT', 'member.trainer_id = PT.id')
      .leftJoin(Staff, 'ST', 'PT.staff_id = ST.id')
      .leftJoin(User, 'TR', 'ST.user_id = TR.id')
      .leftJoin(BodyMeasurement, 'BM', 'BM.member_id = member.id')
      .where('member.id = :memberId', { memberId })
      .getRawOne()
      .then((response) => {
        response.MemberBirthDate = moment(response.MemberBirthDate).format('DD-MM-YYYY');
        return new PageResponseDto(response);
      });
  }

  async destroyMember(memberId: number) {
    const member: Member = await this.membersRepository.findOneByOrFail({
      id: memberId,
    });

    const deletedmember = await this.membersRepository.remove(member);
    this.membersRepository.save(deletedmember);
    return new PageResponseDto(member);
  }

}
