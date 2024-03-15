import { Column, PrimaryGeneratedColumn, Entity, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  role: number;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
