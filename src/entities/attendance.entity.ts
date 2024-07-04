import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entity";

@Entity('attendance')
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    member_id: number;

    @Column()
    time_in: string;

    @Column()
    time_out: string;

    @ManyToOne(() => Member, member => member.attendances)
    @JoinColumn({ name: 'member_id' })
    member: Member;
}