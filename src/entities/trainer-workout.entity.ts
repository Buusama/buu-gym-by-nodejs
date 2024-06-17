import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from './workout.entity';
import { Trainer } from './trainer.entity';

@Entity('trainer_workouts')
export class TrainerWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workout_id: number;

  @Column()
  trainer_id: number;

  @ManyToOne(() => Workout, (workout) => workout.trainerWorkouts)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @ManyToOne(() => Trainer, (trainer) => trainer.trainerWorkouts)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
