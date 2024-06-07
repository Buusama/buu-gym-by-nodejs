import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutEquipment } from './workout-equipment.entity';
import { ServiceWorkout } from './service-workout.entity';
import { PersonalWorkout } from './personal-workout.entity';
import { Booking } from './booking.entity';

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

  @OneToMany(
    () => PersonalWorkout,
    (personalWorkout) => personalWorkout.workout,
  )
  personalWorkouts: PersonalWorkout[];

  @OneToMany(() => Booking, (booking) => booking.workout)
  bookings: Booking[];
}
