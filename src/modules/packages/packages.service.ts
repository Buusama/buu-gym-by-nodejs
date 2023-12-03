import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { Package } from 'src/entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetListPackagesDto } from './dto/get-list-packages.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';

@Injectable()
export class PackagesService extends PageService {
  constructor(
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
  ) {
    super();
  }
  async getPackages(
    getListPackagesDto: GetListPackagesDto,
  ): Promise<PageResponseDto<Package>> {
    const queryBuilder = await this.paginate(
      this.packagesRepository,
      getListPackagesDto,
    );
    queryBuilder.where('table.deleted_at is null');
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto(getListPackagesDto, itemCount);
    return new PageResponseDto(entities, pageMeta);
  }
}
