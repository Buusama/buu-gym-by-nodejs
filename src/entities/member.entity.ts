import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  birth_date: Date;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  status: number;
}
