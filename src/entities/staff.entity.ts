import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

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

  @OneToOne(() => User, (user) => user.id)
  user: User;
}
