import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Package } from '../../entities/package.entity';

export default class PackageSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const specialPackage = [
      {
        name: '30-Day Membership',
        description: 'Access to gym facilities for 30 days',
        price: 1000,
        usage_type: 1,
        usage_limit: 30,
        free_service: [1, 2, 3],
        status: 1,
        commission_for_sellers: 10,
        referral_commission: 5,
        employee_referral_commission: 5,
        commission_status: 1,
      },
      {
        name: '90-Day Membership',
        description: 'Access to gym facilities for 90 days',
        price: 2700,
        usage_type: 1,
        usage_limit: 90,
        free_service: [1, 2, 3],
        status: 1,
        commission_for_sellers: 10,
        referral_commission: 5,
        employee_referral_commission: 5,
        commission_status: 1,
      },
      {
        name: '180-Day Membership',
        description: 'Access to gym facilities for 180 days',
        price: 5100,
        usage_type: 1,
        usage_limit: 180,
        free_service: [1, 2, 3],
        status: 1,
        commission_for_sellers: 10,
        referral_commission: 5,
        employee_referral_commission: 5,
        commission_status: 1,
      },
      {
        name: '365-Day Membership',
        description: 'Access to gym facilities for 365 days',
        price: 9600,
        usage_type: 1,
        usage_limit: 365,
        free_service: [1, 2, 3],
        status: 1,
        commission_for_sellers: 10,
        referral_commission: 5,
        employee_referral_commission: 5,
        commission_status: 1,
      },
    ];

    try {
      await dataSource.createEntityManager().save(Package, specialPackage);
    } catch (error) {
      console.error(
        'Error occurred while seeding special package:',
        error.message,
      );
    }
  }
}
