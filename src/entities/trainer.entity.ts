import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { ServiceClass } from './service-class.entity';
import { Staff } from './staff.entity';
import { TrainerWorkout } from './trainer-workout.entity';
import { DaysOffRequest } from './days-off-requests.entity';

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

  @OneToMany(() => ServiceClass, (service_class) => service_class.trainer)
  serviceClasses: ServiceClass[];

  @OneToMany(() => Booking, (booking) => booking.trainer)
  bookings: Booking[];

  @OneToMany(() => TrainerWorkout, (trainerWorkout) => trainerWorkout.trainer, {
    eager: true,
  })
  trainerWorkouts: TrainerWorkout[];

  @OneToMany(() => DaysOffRequest, (daysOffRequest) => daysOffRequest.trainer)
  daysOffRequests: DaysOffRequest[];
}
