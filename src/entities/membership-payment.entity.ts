import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('membership_payments')
export class MembershipPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member_id: number;

  @Column()
  transaction_id: number;

  @Column()
  payment_date: Date;

  @Column('decimal')
  payment_amount: number;

  @Column()
  payment_type: string;
}
