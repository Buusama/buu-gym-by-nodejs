import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentCategory } from '../../entities/equipment-category.entity';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { CreateEquipmentCategoryDto, GetListEquipmentCategoryDto } from './dto';

@Injectable()
export class EquipmentCategoriesService extends PageService {
  constructor(
    @InjectRepository(EquipmentCategory)
    private equipmentCategoryRepository: Repository<EquipmentCategory>,
  ) {
    super();
  }

  async create(createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    const newEquipmentCategory = new EquipmentCategory();
    const { ...params } = createEquipmentCategoryDto;
    Object.assign(newEquipmentCategory, params);
    await this.equipmentCategoryRepository.save(newEquipmentCategory);
    return newEquipmentCategory;
  }

  async findAll(dto: GetListEquipmentCategoryDto) {
    const queryBuilder = await this.paginate(
      this.equipmentCategoryRepository,
      dto,
    ).select(['table.id,table.name,table.max_capacity']);

    const itemCount = await queryBuilder.getCount();
    let entities = await queryBuilder.getRawMany();
    const pageMeta = new PageMetaDto(dto, itemCount);

    if (pageMeta.page >= 0 && pageMeta.take >= 0)
      entities = entities.slice(
        pageMeta.take * pageMeta.page,
        pageMeta.take * (pageMeta.page + 1),
      );
    return new PageResponseDto(entities, pageMeta);
  }

  async findOne(id: number) {
    return this.equipmentCategoryRepository
      .findOneByOrFail({ id: id })
      .then((response) => response);
  }

  async update(
    id: number,
    updateEquipmentCategoryDto: CreateEquipmentCategoryDto,
  ) {
    const existingEquipmentCategory =
      await this.equipmentCategoryRepository.findOneByOrFail({
        id: id,
      });
    const { ...params } = updateEquipmentCategoryDto;

    Object.assign(existingEquipmentCategory, params);
    await this.equipmentCategoryRepository.save(existingEquipmentCategory);
    return existingEquipmentCategory;
  }

  async remove(id: number) {
    const existingEquipmentCategory =
      await this.equipmentCategoryRepository.findOneByOrFail({
        id: id,
      });
    await this.equipmentCategoryRepository.remove(existingEquipmentCategory);
    return existingEquipmentCategory;
  }
}
