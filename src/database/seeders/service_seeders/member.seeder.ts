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

      const membership_plan_id = faker.number.int({ min: 1, max: 4 });
      const duration =
        membership_plan_id === 1
          ? 30
          : membership_plan_id === 2
            ? 90
            : membership_plan_id === 3
              ? 180
              : 365;

      const end_date = new Date(
        start_date.getTime() + duration * 24 * 60 * 60 * 1000,
      ); // Convert duration thành số mili giây và cộng vào start_date

      memberData.push({
        user_id: user[i].id,
        membership_plan_id,
        start_date,
        end_date,
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
