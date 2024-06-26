import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Session } from './session.entity';
import { Trainer } from './trainer.entity';
import { EquipmentCategory } from './equipment-category.entity';

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

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @OneToMany(() => Booking, (booking) => booking.workout)
  bookings: Booking[];

  @ManyToMany(() => Trainer, trainer => trainer.workouts, { eager: true })
  @JoinTable({
    name: 'trainer_workouts', // Tên bảng liên kết
    joinColumn: {
      name: 'workout_id', // Tên cột của workout
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trainer_id', // Tên cột của trainer
      referencedColumnName: 'id',
    },
  })
  trainers: Trainer[];

  @ManyToMany(() => EquipmentCategory, equipment => equipment.workouts, { eager: true })
  @JoinTable({
    name: 'workout_equipments', // Tên bảng liên kết
    joinColumn: {
      name: 'workout_id', // Tên cột của workout
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'equipment_id', // Tên cột của equipment
      referencedColumnName: 'id',
    },
  })
  equipments: EquipmentCategory[];


  @ManyToMany(() => Session, session => session.workouts)
  sessions: Session[];
}
