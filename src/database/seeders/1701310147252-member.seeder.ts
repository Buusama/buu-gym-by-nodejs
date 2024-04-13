import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { MembershipPlan } from '../../entities/membership-plan.entity';
import { User } from '../../entities/user.entity';

export default class MemberSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const user = await dataSource.getRepository(User).find();
    const memberData = [];

    for (let i = 50; i < 100; i++) {
      const start_date = faker.date.between({
        from: new Date('2021-01-01'),
        to: new Date('2021-05-01'),
      });
      const membership_plan_id = faker.number.int({ min: 1, max: 4 });
      const duration = membership_plan_id == 1 ? 30 : membership_plan_id == 2 ? 90 : membership_plan_id == 3 ? 180 : 365
      memberData.push({
        user_id: user[i].id,
        membership_plan_id,
        start_date,
        end_date: new Date(start_date.getDate() + duration),
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
    } catch (error) {
      console.error('Error occurred while seeding member', error.message);
    }
  }
}
