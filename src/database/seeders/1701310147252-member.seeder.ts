import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Package } from '../../entities/package.entity';
import { Trainer } from '../../entities/trainer.entity';
import { User } from '../../entities/user.entity';
import { DataSource } from 'typeorm';
import { RoleValue } from '../../commons/enums/role-enum';

export default class MemberSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const users = await dataSource.getRepository(User).find();
    const packages = await dataSource.getRepository(Package).find();
    const trainers = await dataSource.getRepository(Trainer).find();
    const memberData = [];

    users.map((user) => {
      if (user.role === RoleValue.MEMBER) {
        memberData.push({
          user_id: user.id,
          package_id:
            packages[faker.number.int({ min: 0, max: packages.length - 1 })].id,
          trainer_id:
            trainers[faker.number.int({ min: 0, max: trainers.length - 1 })].id,
          start_date: faker.date.between({
            from: '2020-01-01',
            to: '2021-01-01',
          }),
          end_date: faker.date.between({
            from: '2021-01-01',
            to: '2022-01-01',
          }),
        });
      }
    });

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
