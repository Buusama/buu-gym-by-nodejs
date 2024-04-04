import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../entities/service.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export default class ServicesSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialServices = [
      {
        name: 'Special Service 1',
        categories: [1, 2, 3],
        saleOff: 10,
        is_online: true,
        description: 'Description for special service 1',
        price: 100,
        duration: 60,
        available: [1, 2, 3, 4, 5],
        language: 'en',
        max_capacity: 10,
        bonus_description: 'Bonus description for special service 1',
        featured_image: faker.image.avatar(),
        gallery_images: [faker.image.avatar(), faker.image.avatar()]
      },
      {
        name: 'Special Service 2',
        categories: [1, 3, 4],
        saleOff: 20,
        is_online: true,
        description: 'Description for special service 2',
        price: 200,
        duration: 120,
        available: [1, 2, 3, 4, 5],
        language: 'en',
        max_capacity: 10,
        bonus_description: 'Bonus description for special service 2',
        featured_image: faker.image.avatar(),
        gallery_images: [faker.image.avatar(), faker.image.avatar()]
      },
      {
        name: 'Special Service 3',
        categories: [2, 3],
        saleOff: 30,
        is_online: true,
        description: 'Description for special service 3',
        price: 300,
        duration: 180,
        available: [1, 2, 3, 4, 5],
        language: 'en',
        max_capacity: 10,
        bonus_description: 'Bonus description for special service 3',
        featured_image: faker.image.url(),
        gallery_images: [faker.image.avatar(), faker.image.avatar()]
      },
      {
        name: 'Special Service 4',
        categories: [1, 4],
        saleOff: 40,
        is_online: true,
        description: 'Description for special service 4',
        price: 400,
        duration: 240,
        available: [1, 2, 3, 4, 5],
        language: 'en',
        max_capacity: 10,
        bonus_description: 'Bonus description for special service 4',
        featured_image: faker.image.avatar(),
        gallery_images: [faker.image.avatar(), faker.image.avatar()]
      },
      {
        name: 'Special Service 5',
        categories: [2, 4],
        saleOff: 50,
        is_online: true,
        description: 'Description for special service 5',
        price: 500,
        duration: 300,
        available: [1, 2, 3, 4, 5],
        language: 'en',
        max_capacity: 10,
        bonus_description: 'Bonus description for special service 5',
        featured_image: faker.image.avatar(),
        gallery_images: [faker.image.avatar(), faker.image.avatar()]
      }
    ];

    try {
      await dataSource.createEntityManager().save(Service, specialServices);
    } catch (error) {
      console.error('Error occurred while seeding Services', error.message);
    }
  }
}
