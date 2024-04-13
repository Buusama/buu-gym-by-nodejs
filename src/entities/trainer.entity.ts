import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from './staff.entity';

@Entity('trainers')
export class Trainer {
  birth_date(birth_date: any) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  staff_id: number;

  @Column()
  experience: string;

  @Column()
  specialty: string;

  @Column()
  rating: number;

  @OneToOne(() => Staff, { eager: true }) // Đảm bảo mối quan hệ user được tải ngay
  @JoinColumn({ name: 'staff_id' }) // Chỉ định tên cột cho việc kết nối
  staff: Staff;
}
