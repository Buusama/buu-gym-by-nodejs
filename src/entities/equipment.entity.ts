import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceEquipment } from './services-equiments.entity';

@Entity('equipments')
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    condition: string;

    @OneToMany(() => ServiceEquipment, serviceEquipment => serviceEquipment.equipment)
    serviceEquipment: ServiceEquipment[];
}
