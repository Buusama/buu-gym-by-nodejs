import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: await bcrypt.hash('admin', 10),
          role: 1,
          avatar: 'https://i.pravatar.cc/300',
        },
      ])
      .execute();
  }
}
