import { Seeder } from '@jorgebodega/typeorm-seeding';
import { ServiceClass } from '../../../entities/service-class.entity';
import { Member } from '../../../entities/member.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export default class BookingSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    try {
      // Lấy danh sách lịch và người dùng từ cơ sở dữ liệu
      const serviceClasses = await dataSource
        .getRepository(ServiceClass)
        .find();
      const members = await dataSource.getRepository(Member).find();

      if (serviceClasses.length === 0 || members.length === 0) {
        throw new Error('No serviceClasses or members found in the database.');
      }

      // Khởi tạo mảng dữ liệu booking
      const bookingData = this.generateBookingData(
        serviceClasses,
        members,
        200,
      );

      // Thực hiện truy vấn insert vào bảng 'bookings' với dữ liệu đã tạo
      await dataSource
        .createQueryBuilder()
        .insert()
        .into('bookings')
        .values(bookingData)
        .execute();

      console.log('Bookings seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding bookings:', error.message);
    }
  }

  private generateBookingData(
    serviceClasses: ServiceClass[],
    members: Member[],
    count: number,
  ) {
    return Array.from({ length: count }, () => {
      const useServiceClass = faker.datatype.boolean();
      let bookingEntry: any = {};

      if (useServiceClass) {
        const randomServiceClass =
          serviceClasses[
            faker.number.int({ min: 0, max: serviceClasses.length - 1 })
          ];
        const randomDate =
          this.getRandomDateForServiceClass(randomServiceClass);

        bookingEntry = {
          service_class_id: randomServiceClass.id,
          trainer_id: null,
          workout_id: null,
          date: randomDate,
          time: randomServiceClass.time,
        };
      } else {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const randomDate = this.getRandomDateInCurrentMonth(
          currentMonth,
          currentYear,
        );

        bookingEntry = {
          service_class_id: null,
          trainer_id: faker.number.int({ min: 1, max: 20 }), // Assuming trainer IDs range from 1 to 20
          workout_id: faker.number.int({ min: 1, max: 21 }), // Assuming workout IDs range from 1 to 21
          date: randomDate.toISOString().split('T')[0],
          time: randomDate.toISOString().split('T')[1].split('.')[0],
        };
      }

      const randomMember =
        members[faker.number.int({ min: 0, max: members.length - 1 })];

      return {
        ...bookingEntry,
        member_id: randomMember.id,
        participants: faker.number.int({ min: 1, max: 10 }),
        payment_method: faker.number.int({ min: 0, max: 2 }),
        note: faker.lorem.sentence(),
        status: faker.number.int({ min: 0, max: 1 }),
      };
    });
  }

  private getRandomDateForServiceClass(serviceClass: ServiceClass): string {
    if (serviceClass.repeat_days) {
      const startDate = new Date(serviceClass.start_date);
      const endDate = new Date(serviceClass.end_date);
      const randomDate = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime()),
      );
      return randomDate.toISOString().split('T')[0];
    } else {
      return serviceClass.start_date;
    }
  }

  private getRandomDateInCurrentMonth(month: number, year: number): Date {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0); // Last day of the month
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }
}
