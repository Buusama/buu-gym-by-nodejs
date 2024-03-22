import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { User } from '../../entities/user.entity';
import { DataSource } from 'typeorm';
import { RoleValue } from '../../commons/enums/role-enum';

export default class StaffSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const user = await dataSource.getRepository(User).find();
    const staffData = [];

    user.map((user) => {
      if (user.role === RoleValue.STAFF || user.role === RoleValue.TRAINER) {
        staffData.push({
          user_id: user.id,
          salary_amount: faker.number.int({ min: 5000000, max: 20000000 }),
          start_date: faker.date.between({
            from: '2020-01-01',
            to: '2021-01-01',
          }),
        });
      }
    });

    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('staffs')
        .values(staffData)
        .execute();
    } catch (error) {
      console.error('Error occurred while seeding staffs', error.message);
    }
  }
}
