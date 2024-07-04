import { ConflictException, Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { Workout } from '../../entities/workout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { CreateWorkoutDto, GetListWorkoutsDto } from './dto';
import { Trainer } from '../../entities/trainer.entity';
import { EquipmentCategory } from '../../entities/equipment-category.entity';

@Injectable()
export class WorkoutsService extends PageService {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>,
    @InjectRepository(EquipmentCategory)
    private equipmentsRepository: Repository<EquipmentCategory>,
  ) {
    super();
  }

  async getWorkouts(
    getListWorkoutsDto: GetListWorkoutsDto,
  ): Promise<PageResponseDto<Workout>> {
    const queryBuilder = await this.paginate(
      this.workoutsRepository,
      getListWorkoutsDto,
    )
      .leftJoinAndMapMany('table.trainers', 'table.trainers', 'trainers')
      .leftJoinAndSelect('trainers.staff', 'staff')
      .leftJoinAndSelect('staff.user', 'user');



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

  async getWorkoutEquipments(id: number): Promise<PageResponseDto<Workout>> {
    const workout = await this.workoutsRepository.findOne({
      where: { id: id },
      select: ['id', 'equipments'],
      relations: ['equipments'],
    })
    return new PageResponseDto(workout);
  }

  async addWorkoutEquipments(
    id: number,
    equipmentId: number,
  ): Promise<PageResponseDto<Workout>> {
    // Fetch the workout with the specified ID and its associated equipments
    const workout = await this.workoutsRepository.findOne({
      where: { id: id },
      relations: ['equipments'],
    });

    if (!workout) {
      throw new ConflictException('Workout not found');
    }

    // Fetch the equipment with the specified ID
    const equipment = await this.equipmentsRepository.findOne({
      where: { id: equipmentId },
    });

    if (!equipment) {
      throw new ConflictException('Equipment not found');
    }

    // Check if the equipment is already in the workout's equipments
    const existingEquipment = workout.equipments.find(
      (e) => e.id === equipmentId,
    );

    if (existingEquipment) {
      throw new ConflictException('Equipment already exists in the workout');
    }
    // Add the equipment to the workout's equipments
    workout.equipments.push(equipment);

    // Save the updated workout back to the repository
    await this.workoutsRepository.save(workout);

    // Return the updated workout in a PageResponseDto
    return new PageResponseDto(workout);
  }

  async deleteWorkoutEquipments(
    id: number,
    equipmentId: number,
  ): Promise<PageResponseDto<Workout>> {
    // Fetch the workout with the specified ID and its associated equipments
    const workout = await this.workoutsRepository.findOne({
      where: { id: id },
      relations: ['equipments'],
    });

    if (!workout) {
      throw new ConflictException('Workout not found');
    }

    // Fetch the equipment with the specified ID
    const equipment = await this.equipmentsRepository.findOne({
      where: { id: equipmentId },
    });

    if (!equipment) {
      throw new ConflictException('Equipment not found');
    }

    // Check if the equipment is in the workout's equipments
    const existingEquipment = workout.equipments.find(
      (e) => e.id === equipmentId,
    );

    if (!existingEquipment) {
      throw new ConflictException('Equipment not found in the workout');
    }

    // Remove the equipment from the workout's equipments
    workout.equipments = workout.equipments.filter(
      (e) => e.id !== equipmentId,
    );

    // Save the updated workout back to the repository
    await this.workoutsRepository.save(workout);

    // Return the updated workout in a PageResponseDto
    return new PageResponseDto(workout);
  }
}
