import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

@Entity('packages')
export class Package extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  duration: number;

  @Column()
  status: number;

  @Column()
  note: string;
}
