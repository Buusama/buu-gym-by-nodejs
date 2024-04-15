import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from './workout.entity';
import { Equipment } from './equipment.entity';
import { Service } from './service.entity';

@Entity('service_workouts')
export class ServiceWorkout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    workout_id: number;

    @Column()
    service_id: number;

    @ManyToOne(() => Workout, (workout) => workout.serviceWorkout)
    @JoinColumn({ name: 'workout_id' })
    workout: Workout;

    @ManyToOne(() => Service, (service) => service.serviceWorkout)
    @JoinColumn({ name: 'service_id' })
    service: Service;
}
