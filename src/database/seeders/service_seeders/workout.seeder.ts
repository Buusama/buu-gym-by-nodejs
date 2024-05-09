import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Workout } from '../../../entities/workout.entity';
import { DataSource } from 'typeorm';

export default class WorkoutSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialWorkOut = [
      {
        name: 'Cardio Blast',
        description: 'Tập thể dục cardio cường độ cao.',
        duration: 30,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvYG_qOfmGHJd-sGv_MF9QOrjrhy34Rs2xWTaKD8_yQ&s',
      },
      {
        name: 'Strength Training',
        description:
          'Tập trung vào việc tăng cường sức mạnh cơ bắp bằng cách sử dụng tạ.',
        duration: 45,
        thumbnail: 'https://hips.hearstapps.com/hmg-prod/images/how-to-start-weight-lifting-strength-training-for-women-1647617733.jpg?crop=1xw:0.8455114822546973xh;center,top',
      },
      {
        name: 'Yoga Flow',
        description:
          'Các chuỗi yoga nhẹ nhàng để tăng tính linh hoạt và thư giãn.',
        duration: 60,
        thumbnail: 'https://media.self.com/photos/5e13a00e35974400085f6746/4:3/w_320%2Cc_limit/GettyImages-1169337435.jpg',
      },
      {
        name: 'HIIT Circuit',
        description: 'Tập thể dục mạch HIIT với cường độ cao.',
        duration: 40,
        thumbnail: 'https://hips.hearstapps.com/hmg-prod/images/athletes-doing-push-ups-with-dumbbells-on-floor-royalty-free-image-1638463573.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*',
      },
      {
        name: 'CrossFit WOD',
        description:
          'Tập thể dục CrossFit của ngày với các động tác chức năng đa dạng.',
        duration: 60,
        thumbnail: 'https://i.ytimg.com/vi/ivyfNzHFeQ4/maxresdefault.jpg',
      },
      {
        name: 'Pilates Core Workout',
        description: 'Các bài tập tăng cường cơ bụng với các kỹ thuật Pilates.',
        duration: 45,
        thumbnail: 'https://media.self.com/photos/620be38803e3e9bbe5b2e335/4:3/w_2560%2Cc_limit/SELF_Workout1Core_018.png',
      },
      {
        name: 'Kickboxing Fitness',
        description:
          'Tập thể dục cardio và sức mạnh với các động tác kickboxing.',
        duration: 50,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmWoQWnuNYs5icDWmUN8X29QJ8Ghl2ZgdMtMoow4Kbg&s',
      },
      {
        name: 'Cycling Intervals',
        description: 'Đạp xe trong nhà với huấn luyện khoảng cách cho sức bền.',
        duration: 45,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwVJ8GfwRNqh6t9QXTJX95mMt9QTHNgt1bn-eCpoFzw&s',
      },
      {
        name: 'Functional Fitness',
        description: 'Tập thể dục toàn diện tích hợp các động tác chức năng.',
        duration: 60,
        thumbnail: 'https://www.anytimefitness.com/wp-content/uploads/2020/06/best-squat-form.jpg',
      },
      {
        name: 'Bodyweight Burn',
        description:
          'Các bài tập vận động bằng cân nặng cơ thể cho sức mạnh và sức bền.',
        duration: 30,
        thumbnail: 'https://bodyweight-burn-honest-review-by-adam-steer.weebly.com/uploads/1/3/9/1/139116096/bod2_orig.jpg',
      },
      {
        name: 'Zumba Dance',
        description:
          'Tập thể dục dựa trên nhảy múa để vui vẻ và tăng cường cardio.',
        duration: 55,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxmL_sBIqxCF70PM4xVuKWPkzxUladUGerbX0EZQWZg&s',
      },
      {
        name: 'Powerlifting Focus',
        description:
          'Nhấn mạnh vào các động tác powerlifting để tăng cường sức mạnh.',
        duration: 60,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOc49SXjUvfjemOX7nuyeZsC9ev6O9f8dA1_CuXkix0Q&s',
      },
      {
        name: 'Barre Sculpt',
        description:
          'Sự kết hợp của các động tác lấy cảm hứng từ ballet để săn chắc cơ bắp.',
        duration: 45,
        thumbnail: 'https://twinkledance-15cc7.kxcdn.com/wp-content/uploads/2022/01/barre-sculpt-2-scaled.jpg',
      },
      {
        name: 'Bootcamp Challenge',
        description:
          'Tập thể dục kiểu bootcamp ngoài trời với nhiều bài tập khác nhau.',
        duration: 50,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJEj2qwRvgY0ZsuhGS9Uv21thUiMki95Un1sDQ6JJVJw&s',
      },
      {
        name: 'TRX Suspension',
        description: 'Tập thể dục toàn diện sử dụng dây treo TRX.',
        duration: 40,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgSpcJkEoN6j84ov039-qF2zyq33qtPIuV-w2ezSJ3zg&s',
      },
      {
        name: 'Swimming Drills',
        description: 'Các bài tập bơi để tăng cường sức mạnh cơ bắp và cardio.',
        duration: 60,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWTuyN2YOYPbnw3bhregjIG8RN7TLI7hQFS3lKoA0gQ&s',
      },
      {
        name: 'MMA Conditioning',
        description:
          'Tập thể dục lấy cảm hứng từ MMA để tăng cường sức mạnh và sức bền.',
        duration: 55,
        thumbnail: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/2147486182/images/g5MzceXSSxizVM1ZS6rv_max-cossack-1.jpg',
      },
      {
        name: 'Circuit Training',
        description: 'Mạch xoay vòng với các trạm tập thể dục khác nhau.',
        duration: 50,
        thumbnail: 'https://blog.nasm.org/hubfs/circuit-training.jpg#keepProtocol',
      },
      {
        name: 'Functional Mobility',
        description:
          'Nâng cao tính linh hoạt và di động thông qua các bài tập chức năng.',
        duration: 40,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoL2aH0Y_GOU9-Vg6_t7hfS2loDieX7Ds4WVvF2atwQ&s',
      },
      {
        name: 'Kettlebell Fusion',
        description:
          'Kết hợp các bài tập với quả cân để tăng cường sức mạnh và sự nhanh nhẹn.',
        duration: 45,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YOsR2CdhmDHaovdYuZEJ6zNGEgFIqn2-iY9GjT5muQ&s',
      },
      {
        name: 'Barbell Complex',
        description:
          'Một loạt các bài tập thanh tạ phức tạp cho bài tập toàn thân.',
        duration: 55,
        thumbnail: 'https://www.mensjournal.com/.image/t_share/MTk2MTM1OTA4NDcyNDY0OTAx/3-bentover-row.jpg',
      },
      {
        name: 'Outdoor Jogging',
        description:
          'Chạy bộ và jogging ngoài trời để tăng cường sức khỏe cardio.',
        duration: 45,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaxtW6W4jSlMkV0BGzdmboT2mXWtNplq_QWJkdvzVcGw&s',
      },
      {
        name: 'Rowing Intervals',
        description:
          'Các khoảng cách đạp thuyền để tăng cường sức mạnh cardio và cơ bắp.',
        duration: 40,
        thumbnail: 'https://boxlifemagazine.com/wp-content/uploads/2022/11/image-89.jpeg',
      },
      {
        name: 'Mindful Stretch',
        description: 'Dãn cơ nhẹ nhàng và tập trung để thư giãn.',
        duration: 30,
        thumbnail: 'https://i.ytimg.com/vi/9SHGBcTLJMc/maxresdefault.jpg',
      },
      {
        name: 'Boxing Conditioning',
        description:
          'Tập thể dục lấy cảm hứng từ boxing để tăng cường sức mạnh và sức bền',
        duration: 50,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSqJlc3tcFtUuD3yo93adW1k3ZPveMoywmB0Q0NwmpQA&s',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Workout, specialWorkOut);
    } catch (error) {
      console.error('Error occurred while seeding workouts', error.message);
    }
  }
}
