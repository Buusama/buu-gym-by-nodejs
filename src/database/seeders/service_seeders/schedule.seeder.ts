import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../../entities/service.entity';
import { DataSource } from 'typeorm';
import { Schedule } from '../../../entities/schedule.entity';
import { faker } from '@faker-js/faker';

export default class ScheduleSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const services = await dataSource.createEntityManager().find(Service);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Ngày mai

    const startDate = new Date(tomorrow);
    startDate.setHours(7, 0, 0, 0); // Thời gian bắt đầu từ 7 giờ sáng

    const endDate = new Date(tomorrow);
    endDate.setHours(19, 0, 0, 0); // Thời gian kết thúc vào 19 giờ tối

    const timeSlotsPerDay = 3; // Số lớp dịch vụ tối đa trong một ngày
    const totalMinutes = (endDate.getTime() - startDate.getTime()) / 60000; // Tổng số phút trong khoảng thời gian từ 7:00 sáng đến 19:00 tối
    const slotDuration = totalMinutes / timeSlotsPerDay;

    const specialSchedules = [];

    for (const service of services) {
      let currentTime = new Date(startDate);
      for (let i = 0; i < timeSlotsPerDay; i++) {
        const randomNumber = faker.number.float({ min: 0, max: 1 })
        if (randomNumber <= 0.6) { // Tỉ lệ 60% cho mỗi lớp dịch vụ
          const minutesToAdd = faker.number.int({ min: 0, max: slotDuration - 1 });
          currentTime.setMinutes(0); // Đặt phút về 0 để tạo giờ chẵn
          currentTime.setTime(currentTime.getTime() + minutesToAdd * 60000); // Thêm số phút vào thời gian hiện tại
          const existingSchedule = specialSchedules.find(schedule => schedule.date.getTime() === currentTime.getTime());
          if (!existingSchedule) {
            specialSchedules.push({
              service_id: service.id,
              date: new Date(currentTime),
              time: `${String(currentTime.getHours()).padStart(2, '0')}:00:00`,
            });
          }
        }
        currentTime.setHours(currentTime.getHours() + Math.floor(slotDuration / 60)); // Di chuyển sang giờ tiếp theo
      }
    }

    try {
      await dataSource.createEntityManager().save(Schedule, specialSchedules);
      console.log('Seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding schedules:', error.message);
    }
  }
}
