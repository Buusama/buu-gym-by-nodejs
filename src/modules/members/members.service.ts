import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from 'src/entities/member.entity';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageService } from '../pagination/page.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { AwsService } from '../aws/aws.service';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService extends PageService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
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
  ): Promise<PageResponseDto<Member>> {
    const queryBuilder = await this.paginate(
      this.membersRepository,
      getListMembersDto,
    );
    queryBuilder.where('table.deleted_at is null');
    if (getListMembersDto.status) {
      queryBuilder.andWhere('table.status = :status', {
        status: getListMembersDto.status,
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
        `table.${getListMembersDto.field} ${getListMembersDto.type} :value`,
        { value: getListMembersDto.value },
      );
    }
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
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
        `memberAvatar/${memberId}/images`,
      );
      return uploadResult;
    } catch (error) {
      throw error;
    }
  }

  async createMember(dto: CreateMemberDto, avatar: Express.Multer.File) {
    const { ...params } = dto;

    const prepareBeforeCreating = this.membersRepository.create(params);
    const member: Member = this.membersRepository.create(prepareBeforeCreating);
    await this.membersRepository.save(member);
    const image = avatar ? await this.uploadAvatar(member.id, avatar) : null;
    if (image) {
      member.avatar = image.Location;
      await this.membersRepository.save(member);
    }
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

    if (params.avatar) {
      delete params.avatar;
    }

    this.membersRepository.merge(existingMember, params);
    const image = avatar ? await this.uploadAvatar(memberId, avatar) : null;
    if (image) {
      if (existingMember.avatar) {
        const avatar = existingMember.avatar.split('/');
        const key = avatar[avatar.length - 1];
        const fullKey = `memberAvatar/${memberId}/images/${key}`;
        await this.s3Service.deleteFile(fullKey);
      }
      existingMember.avatar = image.Location;
    } else {
      if (updateMemberDto.avatar === 'null') {
        const avatar = existingMember.avatar.split('/');
        const key = avatar[avatar.length - 1];
        const fullKey = `memberAvatar/${memberId}/images/${key}`;
        await this.s3Service.deleteFile(fullKey);
        existingMember.avatar = '';
      }
    }
    await this.membersRepository.save(existingMember);

    return this.getById(existingMember.id);
  }

  async getMember(memberId: number): Promise<PageResponseDto<Member>> {
    return this.membersRepository
      .findOneByOrFail({ id: memberId })
      .then((response) => new PageResponseDto(response));
  }

  async destroyMember(memberId: number) {
    const member: Member = await this.membersRepository.findOneByOrFail({
      id: memberId,
    });
    const avatar = member.avatar.split('/');
    const key = avatar[avatar.length - 1];
    const fullKey = `memberAvatar/${memberId}/images/${key}`;
    await this.s3Service.deleteFile(fullKey);

    const deletedmember = await this.membersRepository.softRemove(member);

    return this.membersRepository.save(deletedmember);
  }
}
