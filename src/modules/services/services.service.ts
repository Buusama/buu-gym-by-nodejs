import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipPlan } from 'src/entities/membership-plan.entity';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { GetListServicesDto } from './dto/get-list-services.dto';
import { GetListServiceSchedulesByDayDto } from './dto/get-list-services-schedule.dto';

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
  ): Promise<PageResponseDto<any>> {
    const queryBuilder = await this.paginate(
      this.servicesRepository,
      getListServicesDto,
    );

    const result = await queryBuilder
      .select([
        'table.id AS serviceId',
        'table.name AS serviceName',
        'table.price AS servicePrice',
        'table.duration AS serviceDuration',
        'table.description AS serviceDescription',
        'table.max_participants AS serviceMaxParticipants',
        'workout.id AS workoutId',
        'workout.name AS workoutName',
        'workout.description AS workoutDescription',
        'workout.duration AS workoutDuration',
        'workout.thumbnail AS workoutGallaryImages',
      ])
      .leftJoin('table.serviceWorkout', 'serviceWorkout')
      .leftJoin('serviceWorkout.workout', 'workout')
      .getRawMany();
    // Reorganize the data structure
    const servicesWithWorkouts = result.reduce((accumulator, currentValue) => {
      const existingService = accumulator.find(
        (service) => service.id === currentValue.serviceId,
      );
      if (!existingService) {
        accumulator.push({
          id: currentValue.serviceId,
          name: currentValue.serviceName,
          price: currentValue.servicePrice,
          duration: currentValue.serviceDuration,
          maxParticipants: currentValue.serviceMaxParticipants,
          serviceGallaryImages: [currentValue.workoutGallaryImages], // Start with an array containing the current workout's thumbnail
          workouts: [
            {
              id: currentValue.workoutId,
              name: currentValue.workoutName,
              description: currentValue.workoutDescription,
              duration: currentValue.workoutDuration,
              thumbnail: currentValue.workoutGallaryImages,
            },
          ],
        });
      } else {
        existingService.workouts.push({
          id: currentValue.workoutId,
          name: currentValue.workoutName,
          description: currentValue.workoutDescription,
          duration: currentValue.workoutDuration,
          thumbnail: currentValue.workoutGallaryImages,
        });
        existingService.serviceGallaryImages.push(
          currentValue.workoutGallaryImages,
        ); // Add the current workout's thumbnail to the gallery
      }
      return accumulator;
    }, []);

    // Convert the serviceGallaryImages to an array of URLs
    servicesWithWorkouts.forEach((service) => {
      service.serviceGallaryImages = service.serviceGallaryImages.map(
        (thumbnail) => thumbnail,
      );
    });

    const itemCount = servicesWithWorkouts.length;
    const pageMeta = new PageMetaDto(getListServicesDto, itemCount);

    // PAGINATION
    let entities = servicesWithWorkouts;
    if (pageMeta.page >= 0 && pageMeta.take >= 0)
      entities = servicesWithWorkouts.slice(
        pageMeta.take * pageMeta.page,
        pageMeta.take * (pageMeta.page + 1),
      );

    return new PageResponseDto(entities, pageMeta);
  }

  async getService(id: number): Promise<PageResponseDto<any>> {
    const result = await this.servicesRepository
      .createQueryBuilder('table')
      .select([
        'table.id AS serviceId',
        'table.name AS serviceName',
        'table.price AS servicePrice',
        'table.duration AS serviceDuration',
        'table.description AS serviceDescription',
        'table.max_participants AS serviceMaxParticipants',
        'workout.id AS workoutId',
        'workout.name AS workoutName',
        'workout.description AS workoutDescription',
        'workout.duration AS workoutDuration',
        'workout.thumbnail AS workoutGallaryImages',
      ])
      .leftJoin('table.serviceWorkout', 'serviceWorkout')
      .leftJoin('serviceWorkout.workout', 'workout')
      .where('table.id = :id', { id })
      .getRawMany();

    // Reorganize the data structure
    const service = result.reduce((accumulator, currentValue) => {
      const existingService = accumulator.find(
        (service) => service.id === currentValue.serviceId,
      );
      if (!existingService) {
        accumulator.push({
          id: currentValue.serviceId,
          name: currentValue.serviceName,
          price: currentValue.servicePrice,
          duration: currentValue.serviceDuration,
          description: currentValue.serviceDescription,
          maxParticipants: currentValue.serviceMaxParticipants,
          serviceGallaryImages: [currentValue.workoutGallaryImages], // Start with an array containing the current workout's thumbnail
          workouts: [
            {
              id: currentValue.workoutId,
              name: currentValue.workoutName,
              description: currentValue.workoutDescription,
              duration: currentValue.workoutDuration,
              thumbnail: currentValue.workoutGallaryImages,
            },
          ],
        });
      } else {
        existingService.workouts.push({
          id: currentValue.workoutId,
          name: currentValue.workoutName,
          description: currentValue.workoutDescription,
          duration: currentValue.workoutDuration,
          thumbnail: currentValue.workoutGallaryImages,
        });
        existingService.serviceGallaryImages.push(
          currentValue.workoutGallaryImages,
        ); // Add the current workout's thumbnail to the gallery
      }
      return accumulator;
    }, []);

    // Convert the serviceGallaryImages to an array of URLs
    service.forEach((service) => {
      service.serviceGallaryImages = service.serviceGallaryImages.map(
        (thumbnail) => thumbnail,
      );
    });

    return new PageResponseDto(service[0]);
  }

  async getServiceSchedulesByDay(service_id: number, dto: GetListServiceSchedulesByDayDto): Promise<PageResponseDto<any>> {
    const schedules = await this.servicesRepository
      .createQueryBuilder('service')
      .select([
        'schedule.id AS id',
        'schedule.date AS date',
        'schedule.time AS time',
        'service.name AS serviceName',
      ])
      .leftJoin('service.schedules', 'schedule')
      .where('service.id = :service_id', { service_id })
      .andWhere('schedule.date = :date', { date: dto.date })
      .orderBy('schedule.time', 'ASC')
      .getRawMany();

    const itemCount = schedules.length;
    const pageMeta = new PageMetaDto(dto, itemCount);

    return new PageResponseDto(schedules, pageMeta);
  }

  async findOneById(id: number): Promise<Service> {
    return this.servicesRepository.findOneByOrFail({ id });
  }
}
