import { faker } from '@faker-js/faker/locale/af_ZA';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Equipment } from '../../../entities/equipment.entity';

export default class EquipmentSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const conditions = ['Xuất sắc', 'Tốt', 'Kém'];
    const roomCount = 5;
    const equipmentCount = 25;

    const equipments = Array.from({ length: 300 }, (_, i) => ({
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      serial_id: `SN${i.toString().padStart(5, '0')}`,
      room_id: faker.number.int({ min: 1, max: roomCount }),
      equipment_category_id: faker.number.int({ min: 1, max: equipmentCount }),
    }));

    try {
      await dataSource.createEntityManager().save(Equipment, equipments);
      console.log('Equipment details seeding successful!');
    } catch (error) {
      console.error('Failed to seed equipment details:', error);
    }
  }
}
