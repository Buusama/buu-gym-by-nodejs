import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Equipment } from './equipment.entity';
import { Room } from './room.entity';

@Entity('room_equipments')
export class RoomEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  equipment_id: number;

  @Column()
  room_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.roomEquipments)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @ManyToOne(() => Room, (room) => room.roomEquipments)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
