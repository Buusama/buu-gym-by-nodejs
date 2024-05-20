import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Staff } from './staff.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: number;

  @Column()
  avatar: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  facebook: string;

  @Column()
  address: string;

  role: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToOne(() => Member, (member) => member.user)
  member: Member;

  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;
}
