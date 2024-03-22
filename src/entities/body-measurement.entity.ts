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
    body_fat_percentage: number;

    @Column()
    muscle_mass: number;

    @Column()
    bone_density: number;

    @Column()
    waist_circumference: number;

    @Column()
    hip_circumference: number;

    @Column()
    chest_circumference: number;

    @OneToOne(() => Member, { eager: true })
    @JoinColumn({ name: 'member_id' })
    member: Member;

}
