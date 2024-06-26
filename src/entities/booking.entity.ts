import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Trainer } from './trainer.entity';
import { Workout } from './workout.entity';
import { Service } from './service.entity';
@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainer_id: number;

  @Column()
  member_id: number;

  @Column()
  workout_id: number;

  @Column()
  service_id: number;

  @Column()
  participants: number;

  @Column()
  payment_method: number;

  @Column()
  note: string;

  @Column()
  date: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  status: number;

  @ManyToOne(() => Member, (member) => member.bookings)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Trainer, (trainer) => trainer.bookings)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;

  @ManyToOne(() => Workout, (workout) => workout.bookings)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
