import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsController } from './workouts.controller';
import { Workout } from 'src/entities/workout.entity';
import { WorkoutsService } from './workouts.service';
import { EquipmentCategory } from 'src/entities/equipment-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, EquipmentCategory])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule { }
