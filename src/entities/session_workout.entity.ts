import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from './session.entity';
import { Workout } from './workout.entity';

@Entity('session_workout')
export class SessionWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Session)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @ManyToOne(() => Workout)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @Column()
  session_id: number;

  @Column()
  workout_id: number;
}
