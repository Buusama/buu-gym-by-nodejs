import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { MembershipPlan } from '../../../entities/membership-plan.entity';
import { duration } from 'moment';

export default class MembershipPlanSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const specialMembershipPlan = [
      {
        name: '30-Day Membership',
        description: 'Access to gym facilities for 30 days',
        price: 500000,
        duration: 30,
        free_service: [1, 2, 3],
        status: 1,
      },
      {
        name: '90-Day Membership',
        description: 'Access to gym facilities for 90 days',
        price: 1300000,
        duration: 90,
        free_service: [1, 2, 3],
        status: 1,
      },
      {
        name: '180-Day Membership',
        description: 'Access to gym facilities for 180 days',
        price: 2500000,
        duration: 180,
        free_service: [1, 2, 3],
        status: 1,
      },
      {
        name: '365-Day Membership',
        description: 'Access to gym facilities for 365 days',
        price: 5000000,
        duration: 365,
        free_service: [1, 2, 3],
        status: 1,
      },
    ];

    try {
      await dataSource
        .createEntityManager()
        .save(MembershipPlan, specialMembershipPlan);
      console.log('Special MembershipPlan seeding successful!');
    } catch (error) {
      console.error(
        'Error occurred while seeding special MembershipPlan:',
        error.message,
      );
    }
  }
}
