import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('membership_plans')
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ type: 'int', unsigned: true })
  duration: number;

  @Column({ type: 'json', nullable: true })
  free_service: number[];

  @Column({ type: 'text', nullable: true })
  description: string;
}
