import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Trainer } from './trainer.entity';

@Entity('staffs')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  salary_amount: number;

  @Column()
  start_date: Date;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Trainer, (trainer) => trainer.staff)
  trainer: Trainer;
}
