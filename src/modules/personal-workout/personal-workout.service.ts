import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalWorkout } from 'src/entities/personal-workout.entity';
import { Repository } from 'typeorm';
import { CreatePersonalWorkoutDto } from './dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';

@Injectable()
export class PersonalWorkoutService extends PageService {
  constructor(
    @InjectRepository(PersonalWorkout)
    private personalWorkoutRepository: Repository<PersonalWorkout>,
  ) {
    super();
  }

  async create(createPersonalWorkoutDto: CreatePersonalWorkoutDto) {
    const newPersonalWorkout = new PersonalWorkout();
    const { ...params } = createPersonalWorkoutDto;
    Object.assign(newPersonalWorkout, params);
    await this.personalWorkoutRepository.save(newPersonalWorkout);
    return new PageResponseDto(newPersonalWorkout);
  }
}
