import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Session } from '../../../entities/session.entity';
import { Workout } from '../../../entities/workout.entity';

export default class SessionWorkoutsSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const sessionRepository = dataSource.getRepository(Session);
    const workoutRepository = dataSource.getRepository(Workout);

    const sessionWorkouts = [
      {
        sessionName: 'Buổi tập 1 gói kèm 3 buổi/tuần',
        workoutNames: [
          'Bài tập cổ tay với tạ tay',
          'Bài tập cuộn tạ tay',
          'Kéo xà',
        ],
      },
      {
        sessionName: 'Buổi tập 2 gói kèm 3 buổi/tuần',
        workoutNames: [
          'Kéo cáp cơ tam đầu',
          'Nâng tạ tay cho vai',
          'Đẩy ngực với tạ đòn',
        ],
      },
      {
        sessionName: 'Buổi tập 3 gói kèm 3 buổi/tuần',
        workoutNames: ['Kéo xà', 'Bài tập cuộn tạ tay'],
      },
      {
        sessionName: 'Buổi tập 1 gói kèm 4 buổi/tuần',
        workoutNames: [
          'Kéo cáp cơ tam đầu',
          'Nâng tạ tay cho vai',
          'Đẩy ngực với tạ đòn',
        ],
      },
      {
        sessionName: 'Buổi tập 2 gói kèm 4 buổi/tuần',
        workoutNames: ['Gánh tạ', 'Bài tập bụng với thảm', 'Đẩy chân với máy'],
      },
      {
        sessionName: 'Buổi tập 3 gói kèm 4 buổi/tuần',
        workoutNames: [
          'Kéo cáp cơ tam đầu',
          'Nâng tạ tay cho vai',
          'Bài tập bụng với thảm',
        ],
      },
      {
        sessionName: 'Buổi tập 1 gói kèm 5 buổi/tuần',
        workoutNames: ['Bài tập cuộn tạ tay', 'Kéo xà'],
      },
      {
        sessionName: 'Buổi tập 2 gói kèm 5 buổi/tuần',
        workoutNames: ['Đẩy ngực với tạ đòn', 'Kéo cáp cơ tam đầu'],
      },
      {
        sessionName: 'Buổi tập 3 gói kèm 5 buổi/tuần',
        workoutNames: ['Đẩy chân với máy', 'Nâng bắp chân với máy'],
      },
      {
        sessionName: 'Buổi tập 4 gói kèm 5 buổi/tuần',
        workoutNames: ['Kéo cáp cơ tam đầu', 'Nâng tạ tay cho vai', 'Kéo xà'],
      },
      {
        sessionName: 'Buổi tập 5 gói kèm 5 buổi/tuần',
        workoutNames: ['Đẩy ngực với tạ đòn', 'Bài tập bụng với thảm'],
      },
    ];

    try {
      for (const sessionWorkout of sessionWorkouts) {
        const session = await sessionRepository.findOne({
          where: { name: sessionWorkout.sessionName },
        });
        if (session) {
          for (const workoutName of sessionWorkout.workoutNames) {
            const workout = await workoutRepository.findOne({
              where: { name: workoutName },
            });
            if (workout) {
              await dataSource.query(
                `INSERT INTO session_workout (session_id, workout_id) VALUES (${session.id}, ${workout.id})`,
              );  
            }
          }
        }
      }
      console.log('Session Workouts seeding successful!');
    } catch (error) {
      console.error(
        'Error occurred while seeding Session Workouts',
        error.message,
      );
    }
  }
}
