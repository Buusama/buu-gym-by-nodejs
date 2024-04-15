import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from './workout.entity';
import { Equipment } from './equipment.entity';

@Entity('workout_equipments')
export class WorkoutEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workout_id: number;

  @Column()
  equipment_id: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutEquipment)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @ManyToOne(() => Equipment, (equipment) => equipment.workoutEquipment)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;
}
