import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Staff } from '../../../entities/staff.entity';
import { DataSource } from 'typeorm';
import { RoleValue } from '../../../commons/enums/role-enum';

export default class TrainerSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const staff = await dataSource.getRepository(Staff).find();
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
    const shifts = [0, 1, 2];
    const trainerData = [];

    for (let i = 0; i < 20; i++) {
      const workSchedule = [];
      for (const day of daysOfWeek) {
        for (const shift of shifts) {
          if (Math.random() > 0.2)
            workSchedule.push({ day, shift, isSelected: true });
        }
      }

      trainerData.push({
        staff_id: staff[i].id,
        experience: faker.number.int({ min: 1, max: 10 }),
        specialty: faker.lorem.sentence(),
        work_schedule: workSchedule,
      });
    }

    try {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('trainers')
        .values(trainerData)
        .execute();
      console.log('Trainers seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding staffs', error.message);
    }
  }
}
