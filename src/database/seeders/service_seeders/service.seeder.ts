import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../../entities/service.entity';
import { DataSource } from 'typeorm';
import { fakerVI } from '@faker-js/faker';
import { ServiceTypeValue } from '../../../commons/enums/services/service-type';

export default class ServicesSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialServices = [
      {
        name: 'Gói kèm tập luyện 3 buổi/tuần',
        price: 30000,
        duration: 60,
        maxParticipants: 1,
        description: 'Gói tập luyện 3 buổi/tuần cho người mới bắt đầu',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://file.hstatic.net/1000288768/file/ss-gym-sporty-woman-workout-with-trainer-wellness-healthy-bodybuilding_c210e486903d4212bb7adadf14df3602_grande.jpg',
      },
      {
        name: 'Gói kèm tập luyện 4 buổi/tuần',
        price: 50000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Gói tập luyện 4 buổi/tuần cho người muốn cải thiện sức khỏe',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://file.hstatic.net/1000288768/file/ss-gym-sporty-woman-workout-with-trainer-wellness-healthy-bodybuilding_c210e486903d4212bb7adadf14df3602_grande.jpg',
      },
      {
        name: 'Gói kèm tập luyện 5 buổi/tuần',
        price: 70000,
        duration: 60,
        maxParticipants: 1,
        description:
          'Gói tập luyện 5 buổi/tuần cho người muốn rèn luyện cơ bắp',
        service_type: ServiceTypeValue.PRIVATE,
        thumbnail:
          'https://file.hstatic.net/1000288768/file/ss-gym-sporty-woman-workout-with-trainer-wellness-healthy-bodybuilding_c210e486903d4212bb7adadf14df3602_grande.jpg',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Service, specialServices);
      console.log('Services seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding Services', error.message);
    }
  }
}
