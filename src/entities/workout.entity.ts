import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutEquipment } from './workout-equipment.entity';
import { ServiceWorkout } from './service-workout.entity';

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

  @OneToMany(
    () => WorkoutEquipment,
    (workoutEquipment) => workoutEquipment.workout,
    { eager: true },
  )
  workoutEquipment: WorkoutEquipment[];

  @OneToMany(
    () => ServiceWorkout,
    (serviceWorkout) => serviceWorkout.workout,
    { eager: true },
  )
  serviceWorkout: ServiceWorkout[];
}
