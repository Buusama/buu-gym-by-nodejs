import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTypeValue } from '../../commons/enums/services/service-type';
import { Service } from '../../entities/service.entity';
import { Session } from '../../entities/session.entity';
import { Brackets, Repository } from 'typeorm';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { GetListServiceServiceClassesByDayDto } from './dto/get-list-services-service-classes.dto';
import { GetListServicesDto } from './dto/get-list-services.dto';
import { ServiceSessionDto, createServiceDto } from './dto';
import { AwsService } from '../aws/aws.service';
import { duration } from 'moment';

@Injectable()
export class ServicesService extends PageService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private s3Service: AwsService,
  ) {
    super();
  }
  async findOneById(id: number): Promise<Service> {
    return this.servicesRepository.findOneByOrFail({ id });
  }

  async getServices(
    getListServicesDto: GetListServicesDto,
  ): Promise<PageResponseDto<any>> {
    const queryBuilder = await this.paginate(
      this.servicesRepository,
      getListServicesDto,
    )
      .leftJoinAndMapMany('table.sessions', Session, 'sessions', 'sessions.service_id = table.id')
      .leftJoinAndMapMany('sessions.workouts', 'sessions.workouts', 'workouts')

    if (getListServicesDto.categories) {
      queryBuilder.andWhere('table.service_type IN (:...categories)', {
        categories: getListServicesDto.categories,
      });
    }

    if (getListServicesDto.rangePrices) {
      queryBuilder.andWhere('table.price >= :minPrice', {
        minPrice: getListServicesDto.rangePrices[0],
      });
      queryBuilder.andWhere('table.price <= :maxPrice', {
        maxPrice: getListServicesDto.rangePrices[1],
      });
    }

    if (getListServicesDto.durationTime) {
      queryBuilder.andWhere('table.duration <= :duration', {
        duration: getListServicesDto.durationTime,
      });
    }

    if (getListServicesDto.workouts) {
      queryBuilder.andWhere('workouts.id IN (:...workouts)', {
        workouts: getListServicesDto.workouts,
      });
    }

    if (getListServicesDto.field && getListServicesDto.type && getListServicesDto.value) {
      queryBuilder.andWhere(`${getListServicesDto.field} ${getListServicesDto.type} :value`, {
        value: getListServicesDto.value,
      });
    }

    const [services, itemCount] = await queryBuilder.getManyAndCount();
    const pageMeta = new PageMetaDto(getListServicesDto, itemCount);


    const servicesWithGallaryImages = services.map(service => {
      // Tạo mảng các thumbnail của bài tập từ các phiên tập
      const sessionThumbnails = service.sessions?.map(session => {
        return session.workouts.map(workout => workout.thumbnail);
      }).reduce((acc, val) => acc.concat(val), []);

      // Thêm thumbnail của dịch vụ lên đầu mảng serviceGallaryImages
      const serviceGallaryImages = [service.thumbnail, ...sessionThumbnails];

      return {
        ...service,
        serviceGallaryImages,
      };
    });

    return new PageResponseDto(servicesWithGallaryImages, pageMeta);
  }



  async getService(id: number): Promise<PageResponseDto<any>> {
    const result = await this.servicesRepository.findOne({
      where: { id },
      relations: ['sessions', 'sessions.workouts'],
    });

    if (!result) {
      throw new NotFoundException('Service not found');
    }

    // Tạo danh sách các hình ảnh từ các bài tập
    const serviceGallaryImages = result.sessions.reduce((accumulator, session) => {
      return accumulator.concat(session.workouts.map(workout => workout.thumbnail));
    }, []);

    const newResult = {
      ...result,
      serviceGallaryImages,
    };

    return new PageResponseDto(newResult);
  }

  async getServiceServiceClassesByDay(
    service_id: number,
    dto: GetListServiceServiceClassesByDayDto,
  ): Promise<PageResponseDto<any>> {
    const serviceClasses = await this.servicesRepository
      .createQueryBuilder('service')
      .select([
        'serviceClass.id AS id',
        'serviceClass.start_date AS date',
        'serviceClass.time AS time',
        'service.name AS serviceName',
      ])
      .leftJoin('service.serviceClasses', 'serviceClass')
      .where('service.id = :service_id', { service_id })
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
    const itemCount = serviceClasses.length;
    const pageMeta = new PageMetaDto(dto, itemCount);

    return new PageResponseDto(serviceClasses, pageMeta);
  }

  async getTopServices(limit: number): Promise<PageResponseDto<any>> {
    const services = await this.servicesRepository
      .createQueryBuilder('service')
      .select([
        'service.id AS id',
        'service.name AS name',
        'service.price AS price',
        'service.duration AS duration',
        'service.description AS description',
        'service.max_participants AS maxParticipants',
        'service.thumbnail AS thumbnail',
        'COUNT(booking.id) AS bookingCount',
      ])
      .leftJoin('service.bookings', 'booking')
      .groupBy('service.id')
      .orderBy('bookingCount', 'DESC')
      .limit(limit)
      .getRawMany();

    // Reorganize the data structure
    const servicesWithWorkouts = [];

    for (const currentValue of services) {
      const existingService = servicesWithWorkouts.find(
        (service) => service.id === currentValue.id,
      );

      if (!existingService) {
        const serviceWithThumbnail = {
          id: currentValue.id,
          name: currentValue.name,
          price: currentValue.price,
          duration: currentValue.duration,
          description: currentValue.description,
          maxParticipants: currentValue.maxParticipants,
          bookingCount: currentValue.bookingCount
            ? parseInt(currentValue.bookingCount)
            : 0,
          thumbnail: currentValue.thumbnail,
        };
        servicesWithWorkouts.push(serviceWithThumbnail);
      }
    }

    return new PageResponseDto(servicesWithWorkouts);
  }

  async getServiceSessions(id: number): Promise<PageResponseDto<any>> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service || service.service_type !== ServiceTypeValue.PRIVATE) {
      throw new NotFoundException('Service is not private');
    }

    const sessions = await this.servicesRepository
      .createQueryBuilder('service')
      .select([
        'session.id AS id',
        'session.name AS name',
        'session.description AS description',
        'workout.id AS workoutId',
        'workout.name AS workoutName',
        'workout.duration AS workoutDuration',
        'trainer.id AS trainerId',
        'user.name AS trainerName',
      ])
      .leftJoin(Session, 'session', 'session.service_id = service.id')
      .leftJoin('session.workouts', 'workout')
      .leftJoin('workout.trainers', 'trainer')
      .leftJoin('trainer.staff', 'staff')
      .leftJoin('staff.user', 'user')
      .where('service.id = :id', { id })
      .getRawMany();

    const formattedSessions = sessions.reduce((acc, curr) => {
      let session = acc.find(session => session.id === curr.id);
      if (!session) {
        session = {
          id: curr.id,
          name: curr.name,
          description: curr.description,
          workouts: [],
        };
        acc.push(session);
      }

      const workout = session.workouts.find(workout => workout.id === curr.workoutId);
      if (!workout) {
        session.workouts.push({
          id: curr.workoutId,
          name: curr.workoutName,
          duration: curr.workoutDuration,
          trainers: [{ id: curr.trainerId, name: curr.trainerName }],
        });
      } else {
        workout.trainers.push({ id: curr.trainerId, name: curr.trainerName });
      }

      return acc;
    }, []);

    return new PageResponseDto(formattedSessions);
  }

  async getServiceSessionWorkouts(id: number, sessionId: number): Promise<PageResponseDto<any>> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (service.service_type !== ServiceTypeValue.PRIVATE) {
      throw new NotFoundException('Service is not private');
    }

    const session = await this.sessionRepository.findOne({ where: { id: sessionId } });
    if (session.service_id != id) {
      throw new NotFoundException('Session not found in the specified service');
    }

    const workouts = await this.sessionRepository
      .createQueryBuilder('session')
      .select([
        'workout.id AS id',
        'workout.name AS name',
        'workout.description AS description',
        'workout.duration AS duration',
        'workout.thumbnail AS thumbnail',
      ])
      .leftJoin('session.workouts', 'workout')
      .where('session.id = :sessionId', { sessionId })
      .getRawMany();
    return new PageResponseDto(workouts);
  }

  async getServiceById(serviceId: number) {
    return await this.servicesRepository.findOne({
      where: { id: serviceId },
    });
  }

  async uploadServiceThumbnail(serviceId: number, thumbnail: Express.Multer.File) {
    try {
      const uploadResult = await this.s3Service.uploadFile(
        thumbnail.originalname,
        thumbnail.buffer,
        thumbnail.mimetype,
        `services/${serviceId}/thumbnail`,
      );
      return uploadResult;
    } catch (error) {
      throw new Error('Failed to upload thumbnail');
    }

  }
  async createService(dto: createServiceDto, thumbnail: Express.Multer.File) {
    try {
      const { ...params } = dto;
      const newService = this.servicesRepository.create(params);
      await this.servicesRepository.save(newService);

      if (thumbnail) {
        const uploadResult = await this.uploadServiceThumbnail(newService.id, thumbnail);
        newService.thumbnail = uploadResult.Location;
        await this.servicesRepository.save(newService);
      }
      await this.servicesRepository.save(newService);
      return await this.getServiceById(newService.id);
    } catch (error) {
      throw new Error(`Failed to create service: ${error.message}`);
    }
  }

  async updateService(serviceId: number, dto: createServiceDto, thumbnail: Express.Multer.File) {
    try {
      const existingService = await this.servicesRepository.findOne({
        where: { id: serviceId },
      });
      if (!existingService) {
        throw new NotFoundException('Service not found');
      }

      const { ...params } = dto;
      this.servicesRepository.merge(existingService, params);

      if (thumbnail) {
        const uploadResult = await this.uploadServiceThumbnail(existingService.id, thumbnail);
        existingService.thumbnail = uploadResult.Location;
      }

      await this.servicesRepository.save(existingService);
      return await this.getServiceById(existingService.id);
    } catch (error) {
      throw new Error(`Failed to update service: ${error.message}`);
    }
  }

  async deleteService(serviceId: number) {
    try {
      const existingService = await this.servicesRepository.findOne({
        where: { id: serviceId },
      });
      if (!existingService) {
        throw new NotFoundException('Service not found');
      }

      await this.servicesRepository.remove(existingService);
      return existingService;
    } catch (error) {
      throw new Error(`Failed to delete service: ${error.message}`);
    }
  }
}
