import { PersonalWorkout } from 'src/entities/personal-workout.entity';
import { PersonalWorkoutController } from './personal-workout.controller';
import { PersonalWorkoutService } from './personal-workout.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalWorkout])],
  controllers: [PersonalWorkoutController],
  providers: [PersonalWorkoutService],
  exports: [PersonalWorkoutService],
})
export class PersonalWorkoutModule {}
