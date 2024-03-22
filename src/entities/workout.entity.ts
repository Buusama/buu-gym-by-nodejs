import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutEquipment } from './workout-equipment.entity';

@Entity('workouts')
export class Workout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    duration: number;

    @Column({ default: 1 })
    status: number;

    @OneToMany(() => WorkoutEquipment, workoutEquipment => workoutEquipment.workout)
    workoutEquipment: WorkoutEquipment[];
}
