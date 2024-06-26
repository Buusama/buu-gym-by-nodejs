import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { User } from '../../../entities/user.entity';
import { DataSource } from 'typeorm';
import { RoleValue } from '../../../commons/enums/role-enum';

export default class StaffSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const user = await dataSource.getRepository(User).find();
    const staffData = [];

    for (let i = 10; i < 50; i++) {
      staffData.push({
        user_id: user[i].id,
        salary_amount: faker.number.int({ min: 1000000, max: 20000000 }),
        start_date: faker.date.between({
          from: new Date('2020-01-01'),
          to: new Date('2021-01-01'),
        }),
        end_date: faker.date.between({
          from: new Date('2021-01-01'),
          to: new Date('2022-01-01'),
        }),
      });
    }

    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('staffs')
        .values(staffData)
        .execute();
      console.log('Staffs seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding staffs', error.message);
    }
  }
}
