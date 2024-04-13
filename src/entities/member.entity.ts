import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { MembershipPlan } from './membership-plan.entity';
import { Trainer } from './trainer.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  membership_plan_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => MembershipPlan, { eager: true })
  @JoinColumn({ name: 'membership_plan_id' })
  membership_plan: MembershipPlan;

}
