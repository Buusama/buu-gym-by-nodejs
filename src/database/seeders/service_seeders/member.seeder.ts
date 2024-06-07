import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { MembershipPlan } from '../../../entities/membership-plan.entity';
import { User } from '../../../entities/user.entity';
import { faker } from '@faker-js/faker';

export default class MemberSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const user = await dataSource.getRepository(User).find();
    const memberData = [];

    const startDate = new Date('2024-04-01');
    const currentDate = new Date();

    for (let i = 50; i < 100; i++) {
      const start_date = new Date(
        startDate.getTime() +
          Math.random() * (currentDate.getTime() - startDate.getTime()),
      );

      memberData.push({
        user_id: user[i].id,
        start_date,
        status: faker.number.int({ min: 1, max: 2 }),
      });
    }
    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('members')
        .values(memberData)
        .execute();
      console.log('Members seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding member', error.message);
    }
  }
}
