import { faker, fakerVI } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserFactory } from '../factories/user.factory';

export default class UserSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userFactory = new UserFactory();
    const CreatedUsers = await userFactory.makeMany(100);
    const users: User[] = CreatedUsers;
    await dataSource.createEntityManager().save<User>(users);

    const specialUsers = [
      {
        name: 'Võ Tá Hoan',
        role: 1,
        gender: 1,
        avatar: faker.image.avatar(),
        birth_date: '1999-01-01',
        phone: '0123456780',
        email: 'user1@gmail.com',
        password: await bcrypt.hash('password', 10),
        facebook: faker.internet.url(),
        address: fakerVI.location.streetAddress(),
      },
      {
        name: 'Trần Thị B',
        role: 2,
        gender: 2,
        avatar: faker.image.avatar(),
        birth_date: '1999-01-01',
        phone: '0123456782',
        email: 'user2@gmail.com',
        password: await bcrypt.hash('password', 10),
        facebook: faker.internet.url(),
        address: fakerVI.location.streetAddress(),
      },
      {
        name: 'Trần Thị C',
        role: 3,
        gender: 2,
        avatar: faker.image.avatar(),
        birth_date: '1999-01-01',
        phone: '0123456783',
        email: 'user3@gmail.com',
        password: await bcrypt.hash('password', 10),
        facebook: faker.internet.url(),
        address: fakerVI.location.streetAddress(),
      },
      {
        name: 'Nguyễn Thị E',
        role: 4,
        gender: 2,
        avatar: faker.image.avatar(),
        birth_date: '1999-01-01',
        phone: '0123456785',
        email: 'user4@gmail.com',
        password: await bcrypt.hash('password', 10),
        facebook: faker.internet.url(),
        address: fakerVI.location.streetAddress(),
      },
    ];

    try {
      await dataSource.createEntityManager().save(User, specialUsers);
    } catch (error) {
      console.error(
        'Error occurred while seeding special users:',
        error.message,
      );
    }
  }
}
