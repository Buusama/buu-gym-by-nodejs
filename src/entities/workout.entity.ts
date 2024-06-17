import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { ServiceWorkout } from './service-workout.entity';
import { TrainerWorkout } from './trainer-workout.entity';
import { WorkoutEquipment } from './workout-equipment.entity';
import { Session } from './session.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  duration: number;

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @Column()
  room_id: number;

  @Column()
  capacity: number;

  @OneToMany(
    () => WorkoutEquipment,
    (workoutEquipment) => workoutEquipment.workout,
    { eager: true },
  )
  workoutEquipment: WorkoutEquipment[];

  @OneToMany(() => ServiceWorkout, (serviceWorkout) => serviceWorkout.workout, {
    eager: true,
  })
  serviceWorkout: ServiceWorkout[];

  @OneToMany(() => Booking, (booking) => booking.workout)
  bookings: Booking[];

  @OneToMany(() => TrainerWorkout, (trainerWorkout) => trainerWorkout.workout, {
    eager: true,
  })
  trainerWorkouts: TrainerWorkout[];
}
