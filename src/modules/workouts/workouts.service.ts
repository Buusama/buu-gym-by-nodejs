import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { Workout } from 'src/entities/workout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { CreateWorkoutDto, GetListWorkoutsDto } from './dto';

@Injectable()
export class WorkoutsService extends PageService {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>,
  ) {
    super();
  }

  async getWorkouts(
    getListWorkoutsDto: GetListWorkoutsDto,
  ): Promise<PageResponseDto<Workout>> {
    const queryBuilder = await this.paginate(
      this.workoutsRepository,
      getListWorkoutsDto,
    );

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto(getListWorkoutsDto, itemCount);
    return new PageResponseDto(entities, pageMeta);
  }

  async createWorkout(
    createWorkoutDto: CreateWorkoutDto,
  ): Promise<PageResponseDto<Workout>> {
    const newWorkout = new Workout();
    const { ...params } = createWorkoutDto;
    Object.assign(newWorkout, params);
    await this.workoutsRepository.save(newWorkout);
    return new PageResponseDto(newWorkout);
  }

  async getWorkout(id: number): Promise<PageResponseDto<Workout>> {
    return this.workoutsRepository
      .findOneByOrFail({ id: id })
      .then((response) => new PageResponseDto(response));
  }

  async updateWorkout(
    id: number,
    updateWorkoutDto: CreateWorkoutDto,
  ): Promise<PageResponseDto<Workout>> {
    const existingWorkout = await this.workoutsRepository.findOneByOrFail({
      id: id,
    });
    const { ...params } = updateWorkoutDto;

    this.workoutsRepository.merge(existingWorkout, params);
    await this.workoutsRepository.save(existingWorkout);
    return this.getWorkout(id);
  }

  async deleteWorkout(id: number): Promise<PageResponseDto<Workout>> {
    const existingWorkout = await this.workoutsRepository.findOneByOrFail({
      id: id,
    });

    const deletedWorkout =
      await this.workoutsRepository.remove(existingWorkout);
    this.workoutsRepository.save(deletedWorkout);
    return new PageResponseDto(existingWorkout);
  }
}
