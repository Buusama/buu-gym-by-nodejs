import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceClass } from 'src/entities/service-class.entity';
import { Service } from 'src/entities/service.entity';
import { Brackets, Repository } from 'typeorm';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetServiceClassesByServiceIdAndDayDto } from './dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ServiceClassesService {
  constructor(
    @InjectRepository(ServiceClass)
    private serviceClassesRepository: Repository<ServiceClass>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async findOneById(id: number): Promise<ServiceClass> {
    return this.serviceClassesRepository.findOneByOrFail({ id });
  }

  async getServiceClassesByServiceIdAndDay(
    service_id: number,
    dto: GetServiceClassesByServiceIdAndDayDto,
  ): Promise<any> {
    const service = await this.servicesRepository.findOneBy({ id: service_id });
    if (!service) {
      throw new Error(`Service with id ${service_id} not found`);
    }

    const serviceClasses = await this.serviceClassesRepository
      .createQueryBuilder('serviceClass')
      .select([
        'serviceClass.id AS id',
        'serviceClass.start_date AS date',
        'serviceClass.time AS time',
        'service.name AS serviceName',
      ])
      .leftJoin('serviceClass.service', 'service')
      .where('serviceClass.service_id = :service_id', { service_id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('serviceClass.start_date = :date', {
            date: dto.date,
          }).orWhere(
            'FIND_IN_SET(DAYOFWEEK(:date), serviceClass.repeat_days) AND serviceClass.end_date >= :date',
            {
              date: dto.date,
            },
          );
        }),
      )
      .orderBy('serviceClass.time', 'ASC')
      .getRawMany();

    // PAGE RESPONSE DTO
    const itemCount = serviceClasses.length;
    const pageMeta = new PageMetaDto(dto, itemCount);

    return new PageResponseDto(serviceClasses, pageMeta);
  }

  async getServiceClassesByMember(user: User): Promise<any> {
    const serviceClasses = await this.serviceClassesRepository
      .createQueryBuilder('serviceClass')
      .select([
        'serviceClass.id AS id',
        'serviceClass.date AS date',
        'serviceClass.time AS time',
        'service.name AS serviceName',
        'service.price AS servicePrice',
        'booking.id AS bookingId',
        'service.duration AS serviceDuration',
        'service.service_type AS serviceType',
        'service.thumbnail AS serviceThumbnail',
        'booking.participants AS participants',
        'user.name AS trainerName', // Tên người dùng
      ])
      .leftJoin('serviceClass.service', 'service')
      .leftJoin('serviceClass.bookings', 'booking')
      .leftJoin('serviceClass.trainer', 'trainer')
      .leftJoin('trainer.staff', 'staff')
      .leftJoin('staff.user', 'user')
      .where('booking.member_id = :member_id', { member_id: user.member.id })
      .orderBy('serviceClass.date', 'ASC')
      .addOrderBy('serviceClass.time', 'ASC')
      .getRawMany();

    // PAGE RESPONSE DTO
    const itemCount = serviceClasses.length;
    const pageMeta = new PageMetaDto({}, itemCount);

    return new PageResponseDto(serviceClasses, pageMeta);
  }

  async getServiceClassById(user: User, id: number): Promise<any> {
    const serviceClass = await this.serviceClassesRepository
      .createQueryBuilder('serviceClass')
      .select([
        'serviceClass.id AS id',
        'serviceClass.date AS date',
        'serviceClass.time AS time',
        'service.name AS serviceName',
        'service.price AS servicePrice',
        'booking.id AS bookingId',
        'service.duration AS serviceDuration',
        'service.service_type AS serviceType',
        'service.thumbnail AS serviceThumbnail',
        'booking.participants AS participants',
        'user.name AS trainerName', // Tên người dùng
      ])
      .leftJoin('serviceClass.service', 'service')
      .leftJoin('serviceClass.bookings', 'booking')
      .leftJoin('serviceClass.trainer', 'trainer')
      .leftJoin('trainer.staff', 'staff')
      .leftJoin('staff.user', 'user')
      .where('serviceClass.id = :id', { id })
      .getRawOne();

    if (!serviceClass) {
      throw new Error(`ServiceClass with id ${id} not found`);
    }

    // PAGE RESPONSE DTO
    const itemCount = 1;
    const pageMeta = new PageMetaDto({}, itemCount);

    return new PageResponseDto(serviceClass, pageMeta);
  }
}
