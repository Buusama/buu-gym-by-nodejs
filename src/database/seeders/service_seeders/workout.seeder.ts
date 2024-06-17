import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Workout } from '../../../entities/workout.entity';

export default class WorkoutsSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const workouts = [
      {
        name: 'Bài tập cổ tay với tạ tay',
        description:
          'Bài tập cơ cẳng tay, thực hiện bằng cách cuộn tạ tay bằng cổ tay.',
        duration: 30,
        thumbnail: 'https://example.com/dumbbell_wrist_curl.jpg',
      },
      {
        name: 'Bài tập cuộn tạ tay',
        description:
          'Bài tập cơ bắp tay trước, thực hiện bằng cách cuộn tạ tay lên vai.',
        duration: 30,
        thumbnail: 'https://example.com/dumbbell_bicep_curl.jpg',
      },
      {
        name: 'Kéo xà',
        description:
          'Bài tập cơ lưng, thực hiện bằng cách kéo cơ thể lên bằng thanh xà.',
        duration: 30,
        thumbnail: 'https://example.com/pull_up.jpg',
      },
      {
        name: 'Kéo cáp cơ tam đầu',
        description: 'Bài tập cơ tam đầu, thực hiện bằng cách kéo cáp xuống.',
        duration: 30,
        thumbnail: 'https://example.com/triceps_cable_pushdown.jpg',
      },
      {
        name: 'Nâng tạ tay cho vai',
        description: 'Bài tập cơ vai, thực hiện bằng cách nâng tạ tay lên.',
        duration: 30,
        thumbnail: 'https://example.com/dumbbell_shoulder_press.jpg',
      },
      {
        name: 'Đẩy ngực với tạ đòn',
        description: 'Bài tập cơ ngực, thực hiện bằng cách đẩy tạ đòn lên.',
        duration: 30,
        thumbnail: 'https://example.com/bench_press.jpg',
      },
      {
        name: 'Gánh tạ',
        description: 'Bài tập cơ mông, thực hiện bằng cách gánh tạ.',
        duration: 30,
        thumbnail: 'https://example.com/squat_rack.jpg',
      },
      {
        name: 'Bài tập bụng với thảm',
        description: 'Bài tập cơ bụng, thực hiện trên thảm tập.',
        duration: 30,
        thumbnail: 'https://example.com/abs_mat_workout.jpg',
      },
      {
        name: 'Đẩy chân với máy',
        description: 'Bài tập cơ chân, thực hiện bằng cách đẩy chân với máy.',
        duration: 30,
        thumbnail: 'https://example.com/leg_press_machine.jpg',
      },
      {
        name: 'Nâng bắp chân với máy',
        description:
          'Bài tập cơ bắp chân, thực hiện bằng cách nâng bắp chân với máy.',
        duration: 30,
        thumbnail: 'https://example.com/calf_raise_machine.jpg',
      },
      {
        name: 'Chạy bộ trên máy',
        description:
          'Bài tập cardio, thực hiện bằng cách chạy bộ trên máy chạy.',
        duration: 30,
        thumbnail: 'https://example.com/treadmill.jpg',
      },
      {
        name: 'Đạp xe trên máy',
        description: 'Bài tập cardio, thực hiện bằng cách đạp xe trên máy.',
        duration: 30,
        thumbnail: 'https://example.com/exercise_bike.jpg',
      },
      {
        name: 'Kéo cáp ngực',
        description:
          'Bài tập cơ ngực, thực hiện bằng cách kéo cáp từ dưới lên.',
        duration: 30,
        thumbnail: 'https://example.com/cable_chest_fly.jpg',
      },
      {
        name: 'Nâng tạ đòn qua đầu',
        description: 'Bài tập cơ vai, thực hiện bằng cách nâng tạ đòn qua đầu.',
        duration: 30,
        thumbnail: 'https://example.com/overhead_press.jpg',
      },
      {
        name: 'Nâng tạ tay bên',
        description:
          'Bài tập cơ vai, thực hiện bằng cách nâng tạ tay sang bên.',
        duration: 30,
        thumbnail: 'https://example.com/lateral_raise.jpg',
      },
      {
        name: 'Kéo xà đơn',
        description:
          'Bài tập cơ lưng, thực hiện bằng cách kéo cơ thể lên bằng thanh xà đơn.',
        duration: 30,
        thumbnail: 'https://example.com/chin_up.jpg',
      },
      {
        name: 'Đẩy tạ đòn nằm nghiêng',
        description:
          'Bài tập cơ ngực trên, thực hiện bằng cách đẩy tạ đòn lên khi nằm trên ghế nghiêng.',
        duration: 30,
        thumbnail: 'https://example.com/incline_bench_press.jpg',
      },
      {
        name: 'Gánh tạ đòn phía trước',
        description:
          'Bài tập cơ đùi và mông, thực hiện bằng cách gánh tạ đòn phía trước.',
        duration: 30,
        thumbnail: 'https://example.com/front_squat.jpg',
      },
      {
        name: 'Đẩy ngực với tạ tay',
        description: 'Bài tập cơ ngực, thực hiện bằng cách đẩy tạ tay lên.',
        duration: 30,
        thumbnail: 'https://example.com/dumbbell_bench_press.jpg',
      },
      {
        name: 'Kéo cáp cao',
        description:
          'Bài tập cơ lưng, thực hiện bằng cách kéo cáp từ trên xuống.',
        duration: 30,
        thumbnail: 'https://example.com/lat_pulldown.jpg',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Workout, workouts);
      console.log('Workouts seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding Workouts', error.message);
    }
  }
}
