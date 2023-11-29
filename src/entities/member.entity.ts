import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column()
  gender: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  status: number;
}
