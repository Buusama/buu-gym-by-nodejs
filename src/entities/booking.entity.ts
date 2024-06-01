import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { ServiceClass } from './service-class.entity';
@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  service_class_id: number;

  @Column()
  personal_workout_id: number;

  @Column()
  member_id: number;

  @Column()
  participants: number;

  @Column()
  payment_method: number;

  @Column()
  note: string;

  @ManyToOne(() => Member, (member) => member.bookings)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => ServiceClass, (service_class) => service_class.bookings)
  @JoinColumn({ name: 'service_class_id' })
  serviceClass: ServiceClass;
}
