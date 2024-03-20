import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ type: 'int', unsigned: true })
  usage_type: number;

  @Column({ type: 'int', unsigned: true })
  usage_limit: number;

  @Column({ type: 'json', nullable: true })
  free_service: number[];

  @Column({ type: 'smallint', unsigned: true, default: 1 })
  status: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  commission_for_sellers: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  referral_commission: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  employee_referral_commission: number;

  @Column({ type: 'smallint', unsigned: true })
  commission_status: number;
}
