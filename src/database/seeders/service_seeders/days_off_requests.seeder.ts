import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Trainer } from '../../../entities/trainer.entity';
import { DaysOffRequest } from '../../../entities/days-off-requests.entity';

export default class DaysOffRequestSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialDaysOffRequest = [];
    const trainers = await dataSource.createEntityManager().find(Trainer);

    for (const trainer of trainers) {
      const date = faker.date.between({
        from: new Date('2024-01-01'),
        to: new Date('2024-08-08'),
      });
      const note = faker.lorem.sentence();
      const status = faker.number.int({ min: 1, max: 3 });
      specialDaysOffRequest.push({
        date: date.toISOString().split('T')[0], // Ensure date format is correct
        trainer_id: trainer.id,
        note,
        status,
      });
    }
    try {
      await dataSource
        .createEntityManager()
        .save(DaysOffRequest, specialDaysOffRequest);
      console.log('DaysOffRequest seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding days off', error.message);
    }
  }
}
