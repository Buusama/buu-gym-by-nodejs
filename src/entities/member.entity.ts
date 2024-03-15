import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

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

  @OneToOne(() => User, (user) => user.id)
  user: User;
}
