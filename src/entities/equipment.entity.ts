import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutEquipment } from './workout-equipment.entity';

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  condition: string;

  @OneToMany(
    () => WorkoutEquipment,
    (workoutEquipment) => workoutEquipment.equipment,
  )
  workoutEquipment: WorkoutEquipment[];
}
