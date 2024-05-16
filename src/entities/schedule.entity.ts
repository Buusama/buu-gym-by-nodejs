import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';
import { Booking } from './booking.entity';
import { Trainer } from './trainer.entity';
@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  trainer_id: number;

  @Column({ type: 'int', nullable: true })
  service_id: number;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ type: 'time', nullable: true })
  time: string;

  @ManyToOne(() => Service, (service) => service.schedules)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany(() => Booking, (booking) => booking.schedule)
  bookings: Booking[];

  @ManyToOne(() => Trainer, (trainer) => trainer.schedules)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
