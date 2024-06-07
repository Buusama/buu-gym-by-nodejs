import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../../entities/service.entity';
import { DataSource } from 'typeorm';
import { ServiceClass } from '../../../entities/service-class.entity';
import { faker } from '@faker-js/faker';

export default class ServiceClassSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const services = await dataSource.createEntityManager().find(Service);

    // Define constants
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );
    const startTime = 7; // 7 AM
    const endTime = 19; // 7 PM
    const timeSlotsPerDay = 3; // Maximum number of service classes in a day
    const repeatDays = [1, 2, 3, 4, 5, 6, 7];

    const specialServiceClasses = [];

    services.forEach((service) => {
      if (Math.random() > 0.5) {
        // Create special service class
        const specialClass = createServiceClass(
          service.id,
          firstDayOfMonth.toISOString().slice(0, 10),
          lastDayOfMonth.toISOString().slice(0, 10),
          faker.helpers.shuffle(repeatDays).slice(0, 3).join(','),
          `${startTime}:00:00`,
        );
        specialServiceClasses.push(specialClass);
      }

      // Create 10 regular service classes
      for (let i = 0; i < 10; i++) {
        const randomDate = new Date(firstDayOfMonth);
        randomDate.setDate(
          randomDate.getDate() + faker.number.int({ min: 0, max: 30 }),
        );

        const regularClass = createServiceClass(
          service.id,
          randomDate.toISOString().slice(0, 10),
          randomDate.toISOString().slice(0, 10),
          '',
          `${faker.number.int({ min: startTime, max: endTime })}:00:00`,
        );
        specialServiceClasses.push(regularClass);
      }
    });

    try {
      await dataSource
        .createEntityManager()
        .save(ServiceClass, specialServiceClasses);
      console.log('ServiceClasses have been seeded successfully.');
    } catch (error) {
      console.error(
        'Error occurred while seeding ServiceClasses:',
        error.message,
      );
    }
  }
}

function createServiceClass(
  serviceId: number,
  startDate: string,
  endDate: string,
  repeatDays: string,
  time: string,
): ServiceClass {
  const serviceClass = new ServiceClass();
  serviceClass.service_id = serviceId;
  serviceClass.start_date = startDate;
  serviceClass.end_date = endDate;
  serviceClass.repeat_days = repeatDays;
  serviceClass.time = time;
  return serviceClass;
}
