import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Service } from '../../../entities/service.entity';
import { DataSource } from 'typeorm';
import { Schedule } from '../../../entities/schedule.entity';
import { faker } from '@faker-js/faker';

export default class ScheduleSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const services = await dataSource.createEntityManager().find(Service);

    // Lấy ngày đầu tiên của tháng hiện tại
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Lấy ngày cuối cùng của tháng hiện tại
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Thiết lập thời gian bắt đầu và kết thúc trong một ngày
    const startTime = 7; // 7 giờ sáng
    const endTime = 19; // 7 giờ tối

    const timeSlotsPerDay = 3; // Số lớp dịch vụ tối đa trong một ngày
    const totalDays = (lastDayOfMonth.getTime() - firstDayOfMonth.getTime()) / (1000 * 3600 * 24); // Tổng số ngày trong tháng
    const totalSlots = totalDays * timeSlotsPerDay; // Tổng số khe thời gian cần tạo

    const specialSchedules = [];

    for (const service of services) {
      for (let day = 0; day < totalDays; day++) {
        // Lặp qua từng khe thời gian trong một ngày
        for (let i = 0; i < timeSlotsPerDay; i++) {
          // Tạo thời gian bắt đầu cho khe thời gian hiện tại
          const startTimeForSlot = new Date(firstDayOfMonth);
          startTimeForSlot.setDate(startTimeForSlot.getDate() + day);
          startTimeForSlot.setHours(startTime + Math.floor(i * ((endTime - startTime) / timeSlotsPerDay)));
          startTimeForSlot.setMinutes((i * ((endTime - startTime) / timeSlotsPerDay)) % 60);

          // Chuyển đổi ngày thành chuỗi theo định dạng 'yyyy-mm-dd'
          const formattedDate = startTimeForSlot.toISOString().split('T')[0];

          // Tạo lịch cho khe thời gian hiện tại
          specialSchedules.push({
            service_id: service.id,
            date: formattedDate, // Sử dụng ngày dưới dạng chuỗi 'yyyy-mm-dd'
            time: `${String(startTimeForSlot.getHours()).padStart(2, '0')}:00:00`,
          });
        }
      }
    }

    try {
      await dataSource.createEntityManager().save(Schedule, specialSchedules);
      console.log('Schedules have been seeded successfully.');
    } catch (error) {
      console.error('Error occurred while seeding schedules:', error.message);
    }
  }
}
