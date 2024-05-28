import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from 'src/entities/equipment.entity';
import { Repository } from 'typeorm';
import { CreateEquipmentDto, GetListEquipmentDto } from './dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { EquipmentDetail } from 'src/entities/equipment_detail.entity';
import { Room } from 'src/entities/room.entity';
import { response } from 'express';

@Injectable()
export class EquipmentService extends PageService {
  constructor(
    @InjectRepository(EquipmentDetail)
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
    const queryBuilder = await this.paginate(
      this.equipmentRepository, 
      dto,
    );
  queryBuilder
  .select([
    'table.id AS EquipmentId',
    'table.serial_id AS EquipmentSerialId',
    'table.condition AS EquipmentCondition',
    'R.name AS RoomName',
    'E.name AS EquipmentName',
  ])
  .innerJoin(Room, 'R', 'table.room_id = R.id')
  .innerJoin(Equipment, 'E', 'table.equipment_id = E.id');
  
    if(dto.field && dto.type && dto.value) {
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
