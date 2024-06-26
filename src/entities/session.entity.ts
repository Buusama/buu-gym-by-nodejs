import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';
import { Service } from './service.entity';

@Entity('session')
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    service_id: number;

    @Column()
    description: string;

    @ManyToMany(() => Workout, workout => workout.sessions)
    @JoinTable({
        name: 'session_workout', // Tên bảng liên kết
        joinColumn: {
            name: 'session_id', // Tên cột của Session
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'workout_id', // Tên cột của Workout
            referencedColumnName: 'id',
        },
    })
    workouts: Workout[];

    @ManyToOne(() => Service, service => service.sessions)
    @JoinColumn({ name: 'service_id' })
    service: Service;
}
