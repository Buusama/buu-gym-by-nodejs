import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { EquipmentCategory } from './equipment-category.entity';
import { Room } from './room.entity';

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  condition: string;

  @Column()
  serial_id: string;

  @Column()
  room_id: number;

  @Column()
  equipment_category_id: number;

  @ManyToOne(() => EquipmentCategory, { eager: true })
  @JoinColumn({ name: 'equipment_category_id' })
  equipment_category: EquipmentCategory;

  @OneToOne(() => Room, { eager: true })
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
