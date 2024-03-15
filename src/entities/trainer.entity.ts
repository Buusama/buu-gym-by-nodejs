import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './staff.entity';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  staff_id: number;

  @Column()
  certificate: string;

  @Column()
  specialization: string;

  @OneToOne(() => Staff, (staff) => staff.id)
  staff: Staff;
}
