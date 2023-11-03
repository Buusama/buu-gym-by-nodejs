import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from 'src/entities/member.entity';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListMembersDto } from './dto/get-list-members.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageService } from '../pagination/page.service';

@Injectable()
export class MembersService extends PageService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {
    super();
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
}
