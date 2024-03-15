import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { Package } from 'src/entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetListPackagesDto } from './dto/get-list-packages.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService extends PageService {
  // constructor(
  //   @InjectRepository(Package)
  //   private packagesRepository: Repository<Package>,
  // ) {
  //   super();
  // }

  // async getPackages(
  //   getListPackagesDto: GetListPackagesDto,
  // ): Promise<PageResponseDto<Package>> {
  //   const queryBuilder = await this.paginate(
  //     this.packagesRepository,
  //     getListPackagesDto,
  //   );
  //   queryBuilder.where('table.deleted_at is null');
  //   const itemCount = await queryBuilder.getCount();
  //   const { entities } = await queryBuilder.getRawAndEntities();
  //   const pageMeta = new PageMetaDto(getListPackagesDto, itemCount);
  //   return new PageResponseDto(entities, pageMeta);
  // }

  // async createPackage(
  //   createPackageDto: CreatePackageDto,
  // ): Promise<PageResponseDto<Package>> {
  //   const newPackage = new Package();
  //   const { ...params } = createPackageDto;
  //   Object.assign(newPackage, params);
  //   await this.packagesRepository.save(newPackage);
  //   return new PageResponseDto(newPackage);
  // }

  // async getPackage(id: number): Promise<PageResponseDto<Package>> {
  //   return this.packagesRepository
  //     .findOneByOrFail({ id: id })
  //     .then((response) => new PageResponseDto(response));
  // }

  // async updatePackage(
  //   id: number,
  //   updatePackageDto: CreatePackageDto,
  // ): Promise<PageResponseDto<Package>> {
  //   const existingMember = await this.packagesRepository.findOneByOrFail({
  //     id: id,
  //   });
  //   const { ...params } = updatePackageDto;

  //   this.packagesRepository.merge(existingMember, params);
  //   await this.packagesRepository.save(existingMember);
  //   return this.getPackage(id);
  // }
}
