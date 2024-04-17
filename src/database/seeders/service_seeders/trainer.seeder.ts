import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Staff } from '../../../entities/staff.entity';
import { DataSource } from 'typeorm';
import { RoleValue } from '../../../commons/enums/role-enum';

export default class TrainerSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const staff = await dataSource.getRepository(Staff).find();
    const trainerData = [];

    for (let i = 0; i < 20; i++) {
      trainerData.push({
        staff_id: staff[i].id,
        experience: faker.number.int({ min: 1, max: 10 }),
        speciality: faker.lorem.sentence(),
      });
    }

    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('trainers')
        .values(trainerData)
        .execute();
    } catch (error) {
      console.error('Error occurred while seeding staffs', error.message);
    }
  }
}
