import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Equipment } from '../../../entities/equipment.entity';
import { Room } from '../../../entities/room.entity';
import { EquipmentDetail } from '../../../entities/equipment_detail.entity';

export default class EquipmentDetailSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const conditions = ['Xuất sắc', 'Tốt', 'Kém'];
    const roomCount = 4;
    const equipmentCount = 39;

    const equipmentDetails = Array.from({ length: 100 }, (_, i) => ({
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      serial_id: `SN${i.toString().padStart(5, '0')}`,
      room_id: Math.floor(Math.random() * roomCount),
      equipment_id: Math.floor(Math.random() * equipmentCount),
    }));

    try {
      await dataSource.createEntityManager().save(EquipmentDetail, equipmentDetails);
      console.log('Equipment details seeding successful!');
    } catch (error) {
      console.error('Failed to seed equipment details:', error);
    }
  }
}