import { Seeder } from "@jorgebodega/typeorm-seeding";
import { Schedule } from "../../../entities/schedule.entity";
import { Member } from "../../../entities/member.entity";
import { DataSource } from "typeorm";
import { faker } from '@faker-js/faker';

export default class BookingSeeder extends Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        // Lấy danh sách lịch và người dùng từ cơ sở dữ liệu
        const schedules = await dataSource.getRepository(Schedule).find();
        const members = await dataSource.getRepository(Member).find();
        // Khởi tạo mảng dữ liệu booking
        const bookingData = [];

        // Tạo 100 booking với dữ liệu ngẫu nhiên
        for (let i = 0; i < 100; i++) {
            // Lấy ngẫu nhiên một lịch và một người dùng
            const randomSchedule = schedules[Math.floor(Math.random() * schedules.length)];
            const randomMember = members[Math.floor(Math.random() * members.length)];

            // Tạo dữ liệu booking với thông tin ngẫu nhiên
            const booking = {
                schedule_id: randomSchedule.id,
                member_id: randomMember.id,
                participants: faker.number.int({ min: 1, max: 10 }),
                payment_method: faker.number.int({ min: 0, max: 2 }),
                note: faker.lorem.sentence(),
            };

            // Thêm booking vào mảng dữ liệu booking
            bookingData.push(booking);
        }

        try {
            // Thực hiện truy vấn insert vào bảng 'bookings' với dữ liệu đã tạo
            await dataSource
                .createQueryBuilder()
                .insert()
                .into('bookings')
                .values(bookingData)
                .execute();
            console.log('Bookings seeding successful!');
        } catch (error) {
            console.error('Error occurred while seeding bookings', error.message);
        }
    }
}
