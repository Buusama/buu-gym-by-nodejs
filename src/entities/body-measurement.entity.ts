import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity('body_measurements')
export class BodyMeasurement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member_id: number;

  @Column()
  measurement_date: Date;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  fat: number;

  @Column()
  muscle: number;

  @Column()
  bone: number;

  @Column()
  waist: number;

  @Column()
  hip: number;

  @Column()
  chest: number;

  @OneToOne(() => Member, { eager: true })
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
