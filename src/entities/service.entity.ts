import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from './session.entity';
import { Booking } from './booking.entity';
@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'int', nullable: true })
  max_participants: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  service_type: number;

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @OneToMany(() => Session, session => session.service)
  sessions: Session[];
  
  @OneToMany(() => Booking, booking => booking.service)
  bookings: Booking[];

  serviceGallaryImages: any[];
}
