import { Factory, FactorizedAttrs } from '@jorgebodega/typeorm-factory';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { faker, fakerJA, fakerVI } from '@faker-js/faker';

export class UserFactory extends Factory<User> {
  protected entity = User;
  protected dataSource: DataSource;

  protected attrs(): FactorizedAttrs<User> {
    const gender = faker.number.int({ min: 1, max: 2 });
    const isMale = gender === 1;
    // const role = faker.number.int({ min: 1, max: 4 });
    // make role with percentage of 1:2:2:5
    const role = faker.helpers.arrayElement([1, 2, 2, 3, 3, 4, 4, 4, 4, 4]);
    const firstName = fakerVI.person.firstName(isMale ? 'male' : 'female');
    const lastName = fakerVI.person.lastName(isMale ? 'male' : 'female');
    const name = `${lastName} ${firstName}`;

    const minAge = 10;
    const maxAge = 50;
    const maxDateOfBirth = new Date();
    maxDateOfBirth.setFullYear(maxDateOfBirth.getFullYear() - minAge);
    const minDateOfBirth = new Date();
    minDateOfBirth.setFullYear(minDateOfBirth.getFullYear() - maxAge);

    const birthday = faker.date.between({
      from: minDateOfBirth,
      to: maxDateOfBirth,
    });

    return {
      name,
      gender: gender,
      avatar: faker.image.avatar(),
      birth_date: birthday,
      phone: fakerVI.phone.number().replace(/\s/g, ''),
      email: faker.internet.email({
        firstName,
        lastName,
        provider: 'gmail.com',
      }),
      password: 'password',
      facebook: faker.internet.url(),
      address: fakerVI.location.streetAddress(),
    };
  }
}
