import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: true })
  categories: number[];

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  saleOff: number;

  @Column({ type: 'boolean', nullable: true })
  is_online: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;
  
  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'json', nullable: true })
  available: number[];

  @Column({ type: 'text', nullable: true })
  language: string;

  @Column({ type: 'int', nullable: true })
  max_capacity: number;

  @Column({ type: 'text', nullable: true })
  bonus_description: string;

  @Column({ type: 'text', nullable: true })
  featured_image: string;

  @Column({ type: 'json', nullable: true })
  gallery_images: string[];
}
