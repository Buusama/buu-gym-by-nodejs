import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { Booking } from './booking.entity';
import { Trainer } from './trainer.entity';
@Entity('service_classes')
export class ServiceClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  trainer_id: number;

  @Column({ type: 'int', nullable: true })
  service_id: number;

  @Column({ nullable: true })
  start_date: string;

  @Column({ nullable: true })
  end_date: string;

  @Column()
  repeat_days: string;

  @Column({ type: 'time', nullable: true })
  time: string;

  @ManyToOne(() => Service, (service) => service.serviceClasses)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany(() => Booking, (booking) => booking.serviceClass)
  bookings: Booking[];

  @ManyToOne(() => Trainer, (trainer) => trainer.serviceClasses)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
