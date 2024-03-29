import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Workout } from '../../entities/workout.entity';
import { DataSource } from 'typeorm';

export default class WorkOutSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialWorkOut = [
      {
        name: "Cardio Blast",
        description: "Tập thể dục cardio cường độ cao.",
        duration: 30
      },
      {
        name: "Strength Training",
        description: "Tập trung vào việc tăng cường sức mạnh cơ bắp bằng cách sử dụng tạ.",
        duration: 45
      },
      {
        name: "Yoga Flow",
        description: "Các chuỗi yoga nhẹ nhàng để tăng tính linh hoạt và thư giãn.",
        duration: 60
      },
      {
        name: "HIIT Circuit",
        description: "Tập thể dục mạch HIIT với cường độ cao.",
        duration: 40
      },
      {
        name: "CrossFit WOD",
        description: "Tập thể dục CrossFit của ngày với các động tác chức năng đa dạng.",
        duration: 60
      },
      {
        name: "Pilates Core Workout",
        description: "Các bài tập tăng cường cơ bụng với các kỹ thuật Pilates.",
        duration: 45
      },
      {
        name: "Kickboxing Fitness",
        description: "Tập thể dục cardio và sức mạnh với các động tác kickboxing.",
        duration: 50
      },
      {
        name: "Cycling Intervals",
        description: "Đạp xe trong nhà với huấn luyện khoảng cách cho sức bền.",
        duration: 45
      },
      {
        name: "Functional Fitness",
        description: "Tập thể dục toàn diện tích hợp các động tác chức năng.",
        duration: 60
      },
      {
        name: "Bodyweight Burn",
        description: "Các bài tập vận động bằng cân nặng cơ thể cho sức mạnh và sức bền.",
        duration: 30
      },
      {
        name: "Zumba Dance",
        description: "Tập thể dục dựa trên nhảy múa để vui vẻ và tăng cường cardio.",
        duration: 55
      },
      {
        name: "Powerlifting Focus",
        description: "Nhấn mạnh vào các động tác powerlifting để tăng cường sức mạnh.",
        duration: 60
      },
      {
        name: "Barre Sculpt",
        description: "Sự kết hợp của các động tác lấy cảm hứng từ ballet để săn chắc cơ bắp.",
        duration: 45
      },
      {
        name: "Bootcamp Challenge",
        description: "Tập thể dục kiểu bootcamp ngoài trời với nhiều bài tập khác nhau.",
        duration: 50
      },
      {
        name: "TRX Suspension",
        description: "Tập thể dục toàn diện sử dụng dây treo TRX.",
        duration: 40
      },
      {
        name: "Swimming Drills",
        description: "Các bài tập bơi để tăng cường sức mạnh cơ bắp và cardio.",
        duration: 60
      },
      {
        name: "MMA Conditioning",
        description: "Tập thể dục lấy cảm hứng từ MMA để tăng cường sức mạnh và sức bền.",
        duration: 55
      },
      {
        name: "Circuit Training",
        description: "Mạch xoay vòng với các trạm tập thể dục khác nhau.",
        duration: 50
      },
      {
        name: "Functional Mobility",
        description: "Nâng cao tính linh hoạt và di động thông qua các bài tập chức năng.",
        duration: 40
      },
      {
        name: "Kettlebell Fusion",
        description: "Kết hợp các bài tập với quả cân để tăng cường sức mạnh và sự nhanh nhẹn.",
        duration: 45
      },
      {
        name: "Barbell Complex",
        description: "Một loạt các bài tập thanh tạ phức tạp cho bài tập toàn thân.",
        duration: 55
      },
      {
        name: "Outdoor Jogging",
        description: "Chạy bộ và jogging ngoài trời để tăng cường sức khỏe cardio.",
        duration: 45
      },
      {
        name: "Rowing Intervals",
        description: "Các khoảng cách đạp thuyền để tăng cường sức mạnh cardio và cơ bắp.",
        duration: 40
      },
      {
        name: "Mindful Stretch",
        description: "Dãn cơ nhẹ nhàng và tập trung để thư giãn.",
        duration: 30
      },
      {
        name: "Boxing Conditioning",
        description: "Tập thể dục lấy cảm hứng từ boxing để tăng cường sức mạnh và sức bền",
        duration: 50
      },
    ];

    try {
      await dataSource.createEntityManager().save(Workout, specialWorkOut);
    } catch (error) {
      console.error(
        'Error occurred while seeding workouts',
        error.message,
      );
    }
  }
}
