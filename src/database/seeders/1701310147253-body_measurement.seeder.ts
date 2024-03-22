import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Member } from '../../entities/member.entity';
import { DataSource } from 'typeorm';

export default class BodyMeasurementSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const member = await dataSource.getRepository(Member).find();
    const bodyMeasurementData = [];

    member.map((member) => {
      bodyMeasurementData.push({
        member_id: member.id,
        measurement_date: faker.date.between({
          from: '2024-01-01',
          to: '2025-01-01',
        }),
        height: faker.number.int({ min: 150, max: 200 }),
        weight: faker.number.float({ min: 40, max: 100, fractionDigits: 2 }),
        body_fat_percentage: faker.number.float({ min: 0, max: 50, fractionDigits: 2 }),
        muscle_mass: faker.number.float({ min: 20, max: 100, fractionDigits: 2 }),
        bone_density: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
        waist_circumference: faker.number.float({ min: 50, max: 150, fractionDigits: 2 }),
        hip_circumference: faker.number.float({ min: 50, max: 150, fractionDigits: 2 }),
        chest_circumference: faker.number.float({ min: 50, max: 150, fractionDigits: 2 }),
      });
    });

    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('body_measurements')
        .values(bodyMeasurementData)
        .execute();
    } catch (error) {
      console.error('Error occurred while seeding body measurements', error.message);
    }
  }
}
