import { Injectable, NotFoundException } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { Room } from 'src/entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetListRoomDto } from './dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';

@Injectable()
export class RoomsService extends PageService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {
    super();
  }

  async create(createRoomDto: any) {
    const newRoom = new Room();
    const { ...params } = createRoomDto;
    Object.assign(newRoom, params);
    await this.roomsRepository.save(newRoom);
    return new PageResponseDto(newRoom);
  }

  async findAll(dto: GetListRoomDto) {
    const queryBuilder = await this.paginate(this.roomsRepository, dto);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto(dto, itemCount);
    return new PageResponseDto(entities, pageMeta);
  }

  async findOne(id: number) {
    return this.roomsRepository
      .findOneByOrFail({ id: id })
      .then((response) => new PageResponseDto(response));
  }

  async update(id: number, updateRoomDto: any) {
    const existingRoom = await this.roomsRepository.findOneByOrFail({
      id: id,
    });
    const { ...params } = updateRoomDto;

    Object.assign(existingRoom, params);
    await this.roomsRepository.save(existingRoom);
    return new PageResponseDto(existingRoom);
  }

  async remove(id: number) {
    const existingRoom = await this.roomsRepository.findOneByOrFail({
      id: id,
    });
    await this.roomsRepository.remove(existingRoom);
    return new PageResponseDto(existingRoom);
  }

}
