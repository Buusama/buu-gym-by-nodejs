import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';
import { Equipment } from './equipment.entity';

@Entity('equipment_categories')
export class EquipmentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  max_capacity: number;

  @ManyToMany(() => Workout, workout => workout.equipments)
  workouts: Workout[];

  @OneToMany(() => Equipment, equipment => equipment.equipment_category)
  equipments: Equipment[];
}
