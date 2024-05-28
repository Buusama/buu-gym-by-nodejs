import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipment } from "./equipment.entity";
import { Room } from "./room.entity";

@Entity('equipment_details')
export class EquipmentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  condition: string;

  @Column()
  serial_id: string;

  @Column()
  room_id: number;

  @Column()
  equipment_id: number;

  @OneToOne(() => Equipment, { eager: true })
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @OneToOne(() => Room, { eager: true })
  @JoinColumn({ name: 'room_id' })
  room: Room;
}