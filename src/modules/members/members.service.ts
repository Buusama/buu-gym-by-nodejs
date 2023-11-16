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

@Injectable()
export class MembersService extends PageService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    private s3Service: AwsService
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
      console.log(uploadResult);
      return uploadResult;
    } catch (error) {
      throw error;
    }
  }

  async createMember(dto: CreateMemberDto, avatar: Express.Multer.File) {
      const { ...params } = dto;
      const prepareBeforeCreating = this.membersRepository.create(params);
      const member : Member = this.membersRepository.create(prepareBeforeCreating);
      const image = avatar
      ? await this.uploadAvatar(member.id, avatar)
      : null;
      
      
      await this.membersRepository.save(member);
      return this.getById(member.id);
    
  }
}
