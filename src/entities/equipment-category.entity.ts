import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutEquipment } from './workout-equipment.entity';

@Entity('equipment_categories')
export class EquipmentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  max_capacity: number;

  @OneToMany(
    () => WorkoutEquipment,
    (workoutEquipment) => workoutEquipment.equipment_id,
    { eager: true },
  )
  workoutEquipment: WorkoutEquipment[];
}
