import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  floor: number;

  @Column()
  max_capacity: number;

  @Column({ nullable: true })
  description: string;
}
