import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { DaysOffRequest } from './days-off-requests.entity';
import { Staff } from './staff.entity';
import { Workout } from './workout.entity';

@Entity('trainers')
export class Trainer {
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

  @Column({ type: 'json', nullable: true })
  work_schedule: { day: number; shift: number; isSelected: boolean }[];

  @OneToOne(() => Staff, { eager: true }) // Đảm bảo mối quan hệ user được tải ngay
  @JoinColumn({ name: 'staff_id' }) // Chỉ định tên cột cho việc kết nối
  staff: Staff;

  @OneToMany(() => Booking, (booking) => booking.trainer)
  bookings: Booking[];

  @OneToMany(() => DaysOffRequest, (daysOffRequest) => daysOffRequest.trainer)
  daysOffRequests: DaysOffRequest[];

  @ManyToMany(() => Workout, workout => workout.trainers)
  workouts: Workout[];
}
