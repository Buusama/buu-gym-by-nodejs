import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Trainer } from './trainer.entity';
import { Workout } from './workout.entity';
@Entity('personal_workouts')
export class PersonalWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  trainer_id: number;

  @Column({ type: 'int', nullable: true })
  workout_id: number;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ type: 'time', nullable: true })
  time: string;

  @ManyToOne(() => Workout, (workout) => workout.personalWorkouts)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @OneToMany(() => Booking, (booking) => booking.serviceClass)
  bookings: Booking[];

  @ManyToOne(() => Trainer, (trainer) => trainer.serviceClasses)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
