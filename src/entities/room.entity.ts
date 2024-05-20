import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEquipment } from './room-equipment.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => RoomEquipment, (roomEquipment) => roomEquipment.room, { eager: true })
  roomEquipments: RoomEquipment[];
  
}
