import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Workout } from '../../entities/workout.entity';
import { DataSource } from 'typeorm';

export default class WorkoutSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialWorkOut = [
      {
        name: 'Cardio Blast',
        description: 'Tập thể dục cardio cường độ cao.',
        duration: 30,
        gallary_images: [
          'https://source.unsplash.com/featured/?cardio',
          'https://source.unsplash.com/featured/?cardio',
          'https://source.unsplash.com/featured/?cardio',
          'https://source.unsplash.com/featured/?cardio',
        ],
      },
      {
        name: 'Strength Training',
        description:
          'Tập trung vào việc tăng cường sức mạnh cơ bắp bằng cách sử dụng tạ.',
        duration: 45,
        gallary_images: [
          'https://source.unsplash.com/featured/?strength',
          'https://source.unsplash.com/featured/?strength',
          'https://source.unsplash.com/featured/?strength',
          'https://source.unsplash.com/featured/?strength',
        ],
      },
      {
        name: 'Yoga Flow',
        description:
          'Các chuỗi yoga nhẹ nhàng để tăng tính linh hoạt và thư giãn.',
        duration: 60,
        gallary_images: [
          'https://source.unsplash.com/featured/?yoga',
          'https://source.unsplash.com/featured/?yoga',
          'https://source.unsplash.com/featured/?yoga',
          'https://source.unsplash.com/featured/?yoga',
        ],
      },
      {
        name: 'HIIT Circuit',
        description: 'Tập thể dục mạch HIIT với cường độ cao.',
        duration: 40,
        gallary_images: [
          'https://source.unsplash.com/featured/?hiit',
          'https://source.unsplash.com/featured/?hiit',
          'https://source.unsplash.com/featured/?hiit',
          'https://source.unsplash.com/featured/?hiit',
        ],
      },
      {
        name: 'CrossFit WOD',
        description:
          'Tập thể dục CrossFit của ngày với các động tác chức năng đa dạng.',
        duration: 60,
        gallary_images: [
          'https://source.unsplash.com/featured/?crossfit',
          'https://source.unsplash.com/featured/?crossfit',
          'https://source.unsplash.com/featured/?crossfit',
          'https://source.unsplash.com/featured/?crossfit',
        ],
      },
      {
        name: 'Pilates Core Workout',
        description: 'Các bài tập tăng cường cơ bụng với các kỹ thuật Pilates.',
        duration: 45,
        gallary_images: [
          'https://source.unsplash.com/featured/?pilates',
          'https://source.unsplash.com/featured/?pilates',
          'https://source.unsplash.com/featured/?pilates',
          'https://source.unsplash.com/featured/?pilates',
        ],
      },
      {
        name: 'Kickboxing Fitness',
        description:
          'Tập thể dục cardio và sức mạnh với các động tác kickboxing.',
        duration: 50,
        gallary_images: [
          'https://source.unsplash.com/featured/?kickboxing',
          'https://source.unsplash.com/featured/?kickboxing',
          'https://source.unsplash.com/featured/?kickboxing',
          'https://source.unsplash.com/featured/?kickboxing',
        ],
      },
      {
        name: 'Cycling Intervals',
        description: 'Đạp xe trong nhà với huấn luyện khoảng cách cho sức bền.',
        duration: 45,
        gallary_images: [
          'https://source.unsplash.com/featured/?cycling',
          'https://source.unsplash.com/featured/?cycling',
          'https://source.unsplash.com/featured/?cycling',
          'https://source.unsplash.com/featured/?cycling',
        ],
      },
      {
        name: 'Functional Fitness',
        description: 'Tập thể dục toàn diện tích hợp các động tác chức năng.',
        duration: 60,
        gallary_images: [
          'https://source.unsplash.com/featured/?functional',
          'https://source.unsplash.com/featured/?functional',
          'https://source.unsplash.com/featured/?functional',
          'https://source.unsplash.com/featured/?functional',
        ],
      },
      {
        name: 'Bodyweight Burn',
        description:
          'Các bài tập vận động bằng cân nặng cơ thể cho sức mạnh và sức bền.',
        duration: 30,
        gallary_images: [
          'https://source.unsplash.com/featured/?bodyweight',
          'https://source.unsplash.com/featured/?bodyweight',
          'https://source.unsplash.com/featured/?bodyweight',
          'https://source.unsplash.com/featured/?bodyweight',
        ],
      },
      {
        name: 'Zumba Dance',
        description:
          'Tập thể dục dựa trên nhảy múa để vui vẻ và tăng cường cardio.',
        duration: 55,
        gallary_images: [
          'https://source.unsplash.com/featured/?zumba',
          'https://source.unsplash.com/featured/?zumba',
          'https://source.unsplash.com/featured/?zumba',
          'https://source.unsplash.com/featured/?zumba',
        ],
      },
      {
        name: 'Powerlifting Focus',
        description:
          'Nhấn mạnh vào các động tác powerlifting để tăng cường sức mạnh.',
        duration: 60,
        gallary_images: [
          'https://source.unsplash.com/featured/?powerlifting',
          'https://source.unsplash.com/featured/?powerlifting',
          'https://source.unsplash.com/featured/?powerlifting',
          'https://source.unsplash.com/featured/?powerlifting',
        ],
      },
      {
        name: 'Barre Sculpt',
        description:
          'Sự kết hợp của các động tác lấy cảm hứng từ ballet để săn chắc cơ bắp.',
        duration: 45,
        gallary_images: [
          'https://source.unsplash.com/featured/?barre',
          'https://source.unsplash.com/featured/?barre',
          'https://source.unsplash.com/featured/?barre',
          'https://source.unsplash.com/featured/?barre',
        ],
      },
      {
        name: 'Bootcamp Challenge',
        description:
          'Tập thể dục kiểu bootcamp ngoài trời với nhiều bài tập khác nhau.',
        duration: 50,
        gallary_images: [
          'https://source.unsplash.com/featured/?bootcamp',
          'https://source.unsplash.com/featured/?bootcamp',
          'https://source.unsplash.com/featured/?bootcamp',
          'https://source.unsplash.com/featured/?bootcamp',
        ],
      },
      {
        name: 'TRX Suspension',
        description: 'Tập thể dục toàn diện sử dụng dây treo TRX.',
        duration: 40,
        gallary_images: [
          'https://source.unsplash.com/featured/?trx',
          'https://source.unsplash.com/featured/?trx',
          'https://source.unsplash.com/featured/?trx',
          'https://source.unsplash.com/featured/?trx',
        ],
      },
      {
        name: 'Swimming Drills',
        description: 'Các bài tập bơi để tăng cường sức mạnh cơ bắp và cardio.',
        duration: 60,
        gallary_images: [
          'https://source.unsplash.com/featured/?swimming',
          'https://source.unsplash.com/featured/?swimming',
          'https://source.unsplash.com/featured/?swimming',
          'https://source.unsplash.com/featured/?swimming',
        ],
      },
      {
        name: 'MMA Conditioning',
        description:
          'Tập thể dục lấy cảm hứng từ MMA để tăng cường sức mạnh và sức bền.',
        duration: 55,
        gallary_images: [
          'https://source.unsplash.com/featured/?mma',
          'https://source.unsplash.com/featured/?mma',
          'https://source.unsplash.com/featured/?mma',
          'https://source.unsplash.com/featured/?mma',
        ],
      },
      {
        name: 'Circuit Training',
        description: 'Mạch xoay vòng với các trạm tập thể dục khác nhau.',
        duration: 50,
        gallary_images: [
          'https://source.unsplash.com/featured/?circuit',
          'https://source.unsplash.com/featured/?circuit',
          'https://source.unsplash.com/featured/?circuit',
          'https://source.unsplash.com/featured/?circuit',
        ],
      },
      {
        name: 'Functional Mobility',
        description:
          'Nâng cao tính linh hoạt và di động thông qua các bài tập chức năng.',
        duration: 40,
        gallary_images: [
          'https://source.unsplash.com/featured/?mobility',
          'https://source.unsplash.com/featured/?mobility',
          'https://source.unsplash.com/featured/?mobility',
          'https://source.unsplash.com/featured/?mobility',
        ],
      },
      {
        name: 'Kettlebell Fusion',
        description:
          'Kết hợp các bài tập với quả cân để tăng cường sức mạnh và sự nhanh nhẹn.',
        duration: 45,
        gallary_images: [
          'https://source.unsplash.com/featured/?kettlebell',
          'https://source.unsplash.com/featured/?kettlebell',
          'https://source.unsplash.com/featured/?kettlebell',
          'https://source.unsplash.com/featured/?kettlebell',
        ],
      },
      {
        name: 'Barbell Complex',
        description:
          'Một loạt các bài tập thanh tạ phức tạp cho bài tập toàn thân.',
        duration: 55,
        gallary_images: [
          'https://source.unsplash.com/featured/?barbell',
          'https://source.unsplash.com/featured/?barbell',
          'https://source.unsplash.com/featured/?barbell',
          'https://source.unsplash.com/featured/?barbell',
        ],
      },
      {
        name: 'Outdoor Jogging',
        description:
          'Chạy bộ và jogging ngoài trời để tăng cường sức khỏe cardio.',
        duration: 45,
        gallary_images: [
          'https://source.unsplash.com/featured/?jogging',
          'https://source.unsplash.com/featured/?jogging',
          'https://source.unsplash.com/featured/?jogging',
          'https://source.unsplash.com/featured/?jogging',
        ],
      },
      {
        name: 'Rowing Intervals',
        description:
          'Các khoảng cách đạp thuyền để tăng cường sức mạnh cardio và cơ bắp.',
        duration: 40,
        gallary_images: [
          'https://source.unsplash.com/featured/?rowing',
          'https://source.unsplash.com/featured/?rowing',
          'https://source.unsplash.com/featured/?rowing',
          'https://source.unsplash.com/featured/?rowing',
        ],
      },
      {
        name: 'Mindful Stretch',
        description: 'Dãn cơ nhẹ nhàng và tập trung để thư giãn.',
        duration: 30,
        gallary_images: [
          'https://source.unsplash.com/featured/?stretch',
          'https://source.unsplash.com/featured/?stretch',
          'https://source.unsplash.com/featured/?stretch',
          'https://source.unsplash.com/featured/?stretch',
        ],
      },
      {
        name: 'Boxing Conditioning',
        description:
          'Tập thể dục lấy cảm hứng từ boxing để tăng cường sức mạnh và sức bền',
        duration: 50,
        gallary_images: [
          'https://source.unsplash.com/featured/?boxing',
          'https://source.unsplash.com/featured/?boxing',
          'https://source.unsplash.com/featured/?boxing',
          'https://source.unsplash.com/featured/?boxing',
        ],
      },
    ];

    try {
      await dataSource.createEntityManager().save(Workout, specialWorkOut);
    } catch (error) {
      console.error('Error occurred while seeding workouts', error.message);
    }
  }
}
