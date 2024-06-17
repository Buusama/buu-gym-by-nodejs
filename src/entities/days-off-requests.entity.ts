import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trainer } from './trainer.entity';
@Entity('days_off_requests')
export class DaysOffRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainer_id: number;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  note: string;

  @Column()
  status: number;

  @ManyToOne(() => Trainer, (trainer) => trainer.daysOffRequests)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
