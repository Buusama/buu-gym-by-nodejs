import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';
import { Equipment } from './equipment.entity';

@Entity('services-equipments')
export class ServiceEquipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service_id: number;

    @Column()
    equipment_id: number;

    @ManyToOne(() => Service, service => service.serviceEquipment)
    service: Service;

    @ManyToOne(() => Equipment, equipment => equipment.serviceEquipment)
    equipment: Equipment;
}
