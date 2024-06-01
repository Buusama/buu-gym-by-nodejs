import { ApiProperty } from '@nestjs/swagger';
import { Trainer } from 'src/entities/trainer.entity';
import { Workout } from 'src/entities/workout.entity';
import { JoinColumn, ManyToOne } from 'typeorm';

export class CreatePersonalWorkoutDto {
  @ApiProperty()
  trainer_id: number;

  @ApiProperty()
  workout_id: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;
}
