import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { fakerVI } from '@faker-js/faker';
import { Session } from '../../../entities/session.entity';

export default class SessionsSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialSessions = [
      {
        name: 'Buổi tập 1 gói kèm 3 buổi/tuần',
        service_id: 1,
        description: 'Cẳng tay, tay trước, lưng',
      },
      {
        name: 'Buổi tập 2 gói kèm 3 buổi/tuần',
        service_id: 1,
        description: 'Tay sau, vai, ngực',
      },
      {
        name: 'Buổi tập 3 gói kèm 3 buổi/tuần',
        service_id: 1,
        description: 'Lưng, tay trước',
      },
      {
        name: 'Buổi tập 1 gói kèm 4 buổi/tuần',
        service_id: 2,
        description: 'Tay sau, vai, ngực',
      },
      {
        name: 'Buổi tập 2 gói kèm 4 buổi/tuần',
        service_id: 2,
        description: 'Mông, bụng, chân',
      },
      {
        name: 'Buổi tập 3 gói kèm 4 buổi/tuần',
        service_id: 2,
        description: 'Tay sau, vai, bụng',
      },
      {
        name: 'Buổi tập 1 gói kèm 5 buổi/tuần',
        service_id: 3,
        description: 'Tay trước, lưng',
      },
      {
        name: 'Buổi tập 2 gói kèm 5 buổi/tuần',
        service_id: 3,
        description: 'Ngực, tay sau',
      },
      {
        name: 'Buổi tập 2 gói kèm 5 buổi/tuần',
        service_id: 3,
        description: 'Chân',
      },
      {
        name: 'Buổi tập 3 gói kèm 5 buổi/tuần',
        service_id: 3,
        description: 'Tay sau, vai, lưng',
      },
      {
        name: 'Buổi tập 3 gói kèm 5 buổi/tuần',
        service_id: 3,
        description: 'Ngực, bụng',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Session, specialSessions);
      console.log('Sessions seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding Sessions', error.message);
    }
  }
}
