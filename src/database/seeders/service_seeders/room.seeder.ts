import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Room } from '../../../entities/room.entity';
import { DataSource } from 'typeorm';

export default class RoomSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const rooms = [
      {
        name: 'Phòng 1',
        floor: 1,
        max_capacity: 10,
        description: 'Phòng 1 tầng 1',
      },
      {
        name: 'Phòng 2',
        floor: 2,
        max_capacity: 20,
        description: 'Phòng 2 tầng 2',
      },
      {
        name: 'Phòng 3',
        floor: 3,
        max_capacity: 30,
        description: 'Phòng 3 tầng 3',
      },
      {
        name: 'Phòng 4',
        floor: 4,
        max_capacity: 40,
        description: 'Phòng 4 tầng 4',
      },
      {
        name: 'Phòng 5',
        floor: 5,
        max_capacity: 50,
        description: 'Phòng 5 tầng 5',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Room, rooms);
      console.log('Rooms have been seeded successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
