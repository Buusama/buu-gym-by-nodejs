import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../entities/service.entity';
import { DataSource } from 'typeorm';
import { fakerVI } from '@faker-js/faker';

export default class ServicesSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialServices = [];
    for (let i = 0; i < 40; i++) {
      specialServices.push({
        name: fakerVI.lorem.words(),
        categories: [fakerVI.number.int({ min: 1, max: 5 }), fakerVI.number.int({ min: 1, max: 5 }), fakerVI.number.int({ min: 1, max: 5 })],
        saleOff: fakerVI.number.int({ min: 0, max: 100 }),
        is_online: fakerVI.datatype.boolean(),
        description: fakerVI.lorem.paragraph(),
        price: fakerVI.number.int({ min: 100, max: 300 }) * 1000,
        duration: fakerVI.number.int({ min: 30, max: 180 }) * fakerVI.number.int({ min: 1, max: 3 }),
        available: [1, 2, 3, 4, 5],
        language: 'en',
        max_capacity: fakerVI.number.int({ min: 5, max: 20 }),
        bonus_description: fakerVI.lorem.paragraph(),
        featured_image: fakerVI.image.urlLoremFlickr({ category: 'sports' }),
        gallery_images: [
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
          fakerVI.image.urlLoremFlickr({ category: 'sports' }),
        ],
      })
    }

    try {
      await dataSource.createEntityManager().save(Service, specialServices);
    } catch (error) {
      console.error('Error occurred while seeding Services', error.message);
    }
  }
}
