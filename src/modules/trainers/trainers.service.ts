import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from '../../entities/trainer.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { GetListTrainersDto } from './dto';
import * as moment from 'moment';

@Injectable()
export class TrainersService extends PageService {
  constructor(
    @InjectRepository(Trainer)
    private trainersRepository: Repository<Trainer>,
    private s3Service: AwsService,
  ) {
    super();
  }

  async getById(trainerId: number) {
    return this.trainersRepository
      .findOneByOrFail({ id: trainerId })
      .then((response) => new PageResponseDto(response));
  }

  async getTrainers(
    getListTrainersDto: GetListTrainersDto,
  ): Promise<PageResponseDto<Trainer>> {
    const queryBuilder = await this.paginate(
      this.trainersRepository,
      getListTrainersDto,
    );

    queryBuilder
      .leftJoinAndSelect('table.staff', 'staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('table.workouts', 'workouts');

    this.applyFilters(queryBuilder, getListTrainersDto);

    const itemCount = await queryBuilder.getCount();
    const rawEntities = await queryBuilder.getMany();

    // Process raw entities into a structured format
    let entities = this.structureData(rawEntities);

    const pageMeta = new PageMetaDto(getListTrainersDto, itemCount);

    // PAGINATION
    if (pageMeta.page >= 0 && pageMeta.take >= 0) {
      entities = entities.slice(
        pageMeta.take * pageMeta.page,
        pageMeta.take * (pageMeta.page + 1),
      );
    }

    return new PageResponseDto(entities, pageMeta);
  }

  private applyFilters(queryBuilder, getListTrainersDto: GetListTrainersDto) {
    if (getListTrainersDto.status) {
      queryBuilder.andWhere('trainer.status = :status', {
        status: getListTrainersDto.status,
      });
    }

    if (
      getListTrainersDto.field &&
      getListTrainersDto.type &&
      getListTrainersDto.value
    ) {
      if (getListTrainersDto.type === 'like') {
        getListTrainersDto.value = `%${getListTrainersDto.value}%`;
      }
      queryBuilder.andWhere(
        `trainer.${getListTrainersDto.field} ${getListTrainersDto.type} :value`,
        { value: getListTrainersDto.value },
      );
    }
  }

  private structureData(rawEntities: Trainer[]): any[] {
    return rawEntities.map((trainer) => ({
      TrainerId: trainer.id,
      UserId: trainer.staff.user.id,
      email: trainer.staff.user.email,
      name: trainer.staff.user.name,
      phone: trainer.staff.user.phone,
      avatar: trainer.staff.user.avatar,
      address: trainer.staff.user.address,
      birth_date: moment(trainer.staff.user.birth_date).format('YYYY-MM-DD'),
      gender: trainer.staff.user.gender,
      specialty: trainer.specialty,
      rating: trainer.rating,
      experience: trainer.experience,
      trainerWorkouts: trainer.workouts.map((workout) => ({
        id: workout.id,
        name: workout.name,
      })),
    }));
  }

  // async uploadAvatar(
  //   trainerId: number,
  //   file: Express.Multer.File,
  // ): Promise<any> {
  //   try {
  //     const uploadResult = await this.s3Service.uploadFile(
  //       file.originalname,
  //       file.buffer,
  //       file.mimetype,
  //       `trainerAvatar/${trainerId}/images`,
  //     );
  //     return uploadResult;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // async uploadCertificate(
  //   trainerId: number,
  //   file: Express.Multer.File,
  // ): Promise<any> {
  //   try {
  //     const uploadResult = await this.s3Service.uploadFile(
  //       file.originalname,
  //       file.buffer,
  //       file.mimetype,
  //       `trainerCertificate/${trainerId}/images`,
  //     );
  //     return uploadResult;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // async createTrainer(
  //   dto: CreateTrainerDto,
  //   files?: { avatar?: Express.Multer.File; certificate?: Express.Multer.File },
  // ) {
  //   const { ...params } = dto;
  //   const avatar = files?.avatar ? files.avatar[0] : null;
  //   const certificate = files?.certificate ? files.certificate[0] : null;
  //   const prepareBeforeCreating = this.trainersRepository.create(params);
  //   const trainer: Trainer = this.trainersRepository.create(
  //     prepareBeforeCreating,
  //   );
  //   await this.trainersRepository.save(trainer);
  //   const image = avatar ? await this.uploadAvatar(trainer.id, avatar) : null;
  //   if (image) {
  //     trainer.avatar = image.Location;
  //     await this.trainersRepository.save(trainer);
  //   }
  //   const certificateImage = certificate
  //     ? await this.uploadCertificate(trainer.id, certificate)
  //     : null;
  //   if (certificateImage) {
  //     trainer.certificate = certificateImage.Location;
  //     await this.trainersRepository.save(trainer);
  //   }
  //   return this.getById(trainer.id);
  // }
  // async getTrainerById(trainerId: number) {
  //   return await this.trainersRepository.findOneByOrFail({
  //     id: trainerId,
  //   });
  // }
  // async updateTrainer(
  //   trainerId: number,
  //   dto: UpdateTrainerDto,
  //   files?: { avatar?: Express.Multer.File; certificate?: Express.Multer.File },
  // ) {
  //   console.log(trainerId);
  //   const existingTrainer = await this.getTrainerById(trainerId);
  //   const { ...params } = dto;
  //   const avatar = files?.avatar ? files.avatar[0] : null;
  //   const certificate = files?.certificate ? files.certificate[0] : null;
  //   if (params.avatar) {
  //     delete params.avatar;
  //   }
  //   if (params.certificate) {
  //     delete params.certificate;
  //   }
  //   this.trainersRepository.merge(existingTrainer, params);
  //   const image = avatar ? await this.uploadAvatar(trainerId, avatar) : null;
  //   if (image) {
  //     if (existingTrainer.avatar) {
  //       const avatar = existingTrainer.avatar.split('/');
  //       const key = avatar[avatar.length - 1];
  //       const fullKey = `trainerAvatar/${trainerId}/images/${key}`;
  //       await this.s3Service.deleteFile(fullKey);
  //     }
  //     existingTrainer.avatar = image.Location;
  //   } else {
  //     if (dto.avatar === 'null') {
  //       const avatar = existingTrainer.avatar.split('/');
  //       const key = avatar[avatar.length - 1];
  //       const fullKey = `trainerAvatar/${trainerId}/images/${key}`;
  //       await this.s3Service.deleteFile(fullKey);
  //       existingTrainer.avatar = '';
  //     }
  //   }
  //   const certificateImage = certificate
  //     ? await this.uploadCertificate(trainerId, certificate)
  //     : null;
  //   if (certificateImage) {
  //     if (existingTrainer.certificate) {
  //       const certificate = existingTrainer.certificate.split('/');
  //       const key = certificate[certificate.length - 1];
  //       const fullKey = `trainerCertificate/${trainerId}/images/${key}`;
  //       await this.s3Service.deleteFile(fullKey);
  //     }
  //     existingTrainer.certificate = certificateImage.Location;
  //   } else {
  //     if (dto.certificate === 'null') {
  //       const certificate = existingTrainer.certificate.split('/');
  //       const key = certificate[certificate.length - 1];
  //       const fullKey = `trainerCertificate/${trainerId}/images/${key}`;
  //       await this.s3Service.deleteFile(fullKey);
  //       existingTrainer.certificate = '';
  //     }
  //   }
  //   await this.trainersRepository.save(existingTrainer);
  //   return this.getById(existingTrainer.id);
  // }
  async getTrainer(trainerId: number): Promise<PageResponseDto<Trainer>> {
    const queryBuilder = this.trainersRepository
      .createQueryBuilder('trainer')
      .leftJoinAndSelect('trainer.staff', 'staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndMapMany('trainer.workouts', 'trainer.workouts', 'workouts')
      .where('trainer.id = :trainerId', { trainerId });

    const rawEntities = await queryBuilder.getOne();
    return new PageResponseDto(rawEntities);
  }

  async destroyTrainer(trainer_id: number) {
    const trainer = await this.trainersRepository.findOneByOrFail({
      id: trainer_id,
    });

    const deleteTrainer = await this.trainersRepository.remove(trainer);
    this.trainersRepository.save(deleteTrainer);
    return new PageResponseDto(trainer);
  }

  async getAvailableWorkouts(trainer_id: number) {
    return this.trainersRepository
      .createQueryBuilder('trainer')
      .select([
        // 'trainer.id AS TrainerId',
        'workout.id AS workoutId',
        'workout.name AS workoutName',
        // 'workout.description AS WorkoutDescription',
        // 'workout.duration AS WorkoutDuration',
      ])
      .innerJoin('trainer.workouts', 'workout')
      .getRawMany()
      .then((response) => new PageResponseDto(response));
  }

  async getWorkSchedules(trainer_id: number) {
    return this.trainersRepository
      .createQueryBuilder('trainer')
      .select([
        'trainer.id AS TrainerId',
        'trainer.work_schedule AS WorkSchedules',
      ])
      .where('trainer.id = :trainer_id', { trainer_id })
      .getRawMany()
      .then((response) => new PageResponseDto(response));
  }

  async updateWorkSchedules(
    trainer_id: number,
    work_schedule: { day: number; shift: number; isSelected: boolean }[],
  ) {
    const trainer = await this.trainersRepository.findOneByOrFail({
      id: trainer_id,
    });

    trainer.work_schedule = work_schedule;
    await this.trainersRepository.save(trainer);
    return new PageResponseDto(trainer);
  }
}
