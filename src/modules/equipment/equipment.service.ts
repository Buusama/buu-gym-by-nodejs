import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from '../../entities/equipment.entity';
import { Room } from '../../entities/room.entity';
import { Repository } from 'typeorm';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { CreateEquipmentDto, GetListEquipmentDto } from './dto';
import { EquipmentCategory } from '../../entities/equipment-category.entity';

@Injectable()
export class EquipmentService extends PageService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {
    super();
  }

  async create(createEquipmentDto: CreateEquipmentDto) {
    const newEquipment = new Equipment();
    const { ...params } = createEquipmentDto;
    Object.assign(newEquipment, params);
    await this.equipmentRepository.save(newEquipment);
    return newEquipment;
  }

  async findAll(dto: GetListEquipmentDto) {
    const queryBuilder = await this.paginate(this.equipmentRepository, dto);
    queryBuilder
      .select([
        'table.id AS EquipmentId',
        'table.serial_id AS EquipmentSerialId',
        'table.condition AS EquipmentCondition',
        'R.name AS RoomName',
        'E.name AS EquipmentName',
      ])
      .innerJoin(Room, 'R', 'table.room_id = R.id')
      .innerJoin(EquipmentCategory, 'E', 'table.equipment_category_id = E.id');

    if (dto.field && dto.type && dto.value) {
      queryBuilder.andWhere(`${dto.field} = :value`, { value: dto.value });
    }
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
    return this.equipmentRepository
      .findOneByOrFail({ id: id })
      .then((response) => response);
  }

  async update(id: number, updateEquipmentDto: CreateEquipmentDto) {
    const existingEquipment = await this.equipmentRepository.findOneByOrFail({
      id: id,
    });
    const { ...params } = updateEquipmentDto;

    Object.assign(existingEquipment, params);
    await this.equipmentRepository.save(existingEquipment);
    return existingEquipment;
  }

  async remove(id: number) {
    const existingEquipment = await this.equipmentRepository.findOneByOrFail({
      id: id,
    });
    await this.equipmentRepository.remove(existingEquipment);
    return existingEquipment;
  }
}
