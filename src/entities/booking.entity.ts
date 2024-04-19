import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entity";
import { Schedule } from "./schedule.entity";
@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    schedule_id: number;

    @Column()
    member_id: number;

    @Column()
    participants: number;;

    @Column()
    payment_method: number;

    @Column()
    note: string;

    @ManyToOne(() => Member, (member) => member.bookings)
    @JoinColumn({ name: 'member_id' })
    member: Member;

    @ManyToOne(() => Schedule, (schedule) => schedule.bookings)
    @JoinColumn({ name: 'schedule_id' })
    schedule: Schedule;
}
