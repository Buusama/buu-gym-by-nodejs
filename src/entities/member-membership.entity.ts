import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('member_membership')
export class MemberMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member_id: number;

  @Column()
  membership_plan_id: number;

  @Column()
  start_date: Date;

  @Column()
  note: string;
}
