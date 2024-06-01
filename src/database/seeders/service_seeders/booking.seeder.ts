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
      const randomServiceClass =
        serviceClasses[
          faker.number.int({ min: 0, max: serviceClasses.length - 1 })
        ];
      const randomMember =
        members[faker.number.int({ min: 0, max: members.length - 1 })];

      return {
        service_class_id: randomServiceClass.id,
        member_id: randomMember.id,
        participants: faker.number.int({ min: 1, max: 10 }),
        payment_method: faker.number.int({ min: 0, max: 2 }),
        note: faker.lorem.sentence(),
      };
    });
  }
}
