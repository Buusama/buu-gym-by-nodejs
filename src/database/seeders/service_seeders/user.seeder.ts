import { faker, fakerVI } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../../../entities/user.entity';

export default class UserSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialUsers = [];
    for (let i = 0; i < 100; i++) {
      specialUsers.push({
        name: `${fakerVI.person.lastName()} ${fakerVI.person.firstName()}`,
        gender: faker.number.int({ min: 1, max: 2 }),
        avatar: faker.image.avatar(),
        birth_date: faker.date.between({
          from: new Date('1950-01-01'),
          to: new Date('2003-01-01'),
        }),
        phone: fakerVI.phone.number().replace(/\s/g, ''),
        email: `user${i}@gmail.com`,
        password: await bcrypt.hash('password', 10),
        facebook: faker.internet.url(),
        address: fakerVI.location.streetAddress(),
      });
    }

    try {
      await dataSource.createEntityManager().save(User, specialUsers);
      console.log('User seeding successful!');
    } catch (error) {
      console.error(
        'Error occurred while seeding special users:',
        error.message,
      );
    }
  }
}
