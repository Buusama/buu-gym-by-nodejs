import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Staff } from '../../entities/staff.entity';
import { DataSource } from 'typeorm';
import { RoleValue } from '../../commons/enums/role-enum';

export default class TrainerSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const staff = await dataSource.getRepository(Staff).find();
    const trainerData = [];

    staff.forEach((staff) => {
      if (staff.user.role === RoleValue.TRAINER) {
        trainerData.push({
          staff_id: staff.id,
          certificate: faker.lorem.sentence(),
          specialization: faker.lorem.sentence(),
        });
      }
    });

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
