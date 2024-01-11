import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

@Entity('trainers')
export class Trainer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  certificate: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column()
  gender: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  status: number;

  @Column()
  note: string;

  @Column()
  facebook: string;
}
