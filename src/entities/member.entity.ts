import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Package } from './package.entity';
import { Trainer } from './trainer.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  package_id: number;

  @Column()
  trainer_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Package, { eager: true })
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @OneToOne(() => Trainer, { eager: true })
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}
