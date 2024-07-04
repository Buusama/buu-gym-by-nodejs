import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsController } from './workouts.controller';
import { Workout } from '../../entities/workout.entity';
import { WorkoutsService } from './workouts.service';
import { EquipmentCategory } from '../../entities/equipment-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, EquipmentCategory])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule { }
