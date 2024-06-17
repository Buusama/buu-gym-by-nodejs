import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Member } from '../../../entities/member.entity';
import { Trainer } from '../../../entities/trainer.entity'; // Assuming there is a Trainer entity
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export default class BookingSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    try {
      // Lấy danh sách người dùng và giáo viên từ cơ sở dữ liệu
      const members = await dataSource.getRepository(Member).find();
      const trainers = await dataSource.getRepository(Trainer).find();

      if (members.length === 0) {
        throw new Error('No members found in the database.');
      }

      if (trainers.length === 0) {
        throw new Error('No trainers found in the database.');
      }

      // Khởi tạo mảng dữ liệu booking
      const bookingData = this.generateBookingData(members, trainers, 500);

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
    members: Member[],
    trainers: Trainer[],
    count: number,
  ) {
    const bookings = Array.from({ length: count }, () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const randomDate = this.getRandomDateInCurrentMonth(
        currentMonth,
        currentYear,
      );

      const bookingEntry = {
        service_class_id: null,
        trainer_id: null,
        workout_id: faker.number.int({ min: 1, max: 21 }), // Assuming workout IDs range from 1 to 21
        date: randomDate.toISOString().split('T')[0],
        time: this.getRandomTimeInRange(), // Ensure time is within 6h to 21h
      };

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

    // Gán ngẫu nhiên giáo viên cho 20% số bookings
    const bookingsWithTrainers = bookings
      .slice(0, Math.floor(count * 0.2))
      .map((booking) => {
        const randomTrainer =
          trainers[faker.number.int({ min: 0, max: trainers.length - 1 })];
        return {
          ...booking,
          trainer_id: randomTrainer.id,
        };
      });

    return [
      ...bookingsWithTrainers,
      ...bookings.slice(Math.floor(count * 0.2)),
    ];
  }

  private getRandomDateInCurrentMonth(month: number, year: number): Date {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0); // Last day of the month
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  private getRandomTimeInRange(): string {
    const startHour = 6;
    const endHour = 21;
    const hour = faker.number.int({ min: startHour, max: endHour });
    const minute = faker.number.int({ min: 0, max: 59 });
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
  }
}
