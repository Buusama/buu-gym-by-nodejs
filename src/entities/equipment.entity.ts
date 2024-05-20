import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutEquipment } from './workout-equipment.entity';
import { RoomEquipment } from './room-equipment.entity';

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
    (workoutEquipment) => workoutEquipment.equipment_id,
    { eager: true },
  )
  workoutEquipment: WorkoutEquipment[];

  @OneToMany(() => RoomEquipment, (roomEquipment) => roomEquipment.equipment, { eager: true })
  roomEquipments: RoomEquipment[];
}
