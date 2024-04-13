import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/entities/membership-plan.entity';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { GetListServicesDto } from './dto/get-list-services.dto';

@Injectable()
export class ServicesService extends PageService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {
    super();
  }

  async getServices(
    getListServicesDto: GetListServicesDto,
  ): Promise<PageResponseDto<Service>> {
    const queryBuilder = await this.paginate(
      this.servicesRepository,
      getListServicesDto,
    );

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto(getListServicesDto, itemCount);
    return new PageResponseDto(entities, pageMeta);
  }

  async getService(id: number): Promise<PageResponseDto<Service>> {
    return this.servicesRepository
      .findOneByOrFail({ id: id })
      .then((response) => new PageResponseDto(response));
  }
}
