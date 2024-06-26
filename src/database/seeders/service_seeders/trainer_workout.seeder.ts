import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Trainer } from '../../../entities/trainer.entity';
import { Workout } from '../../../entities/workout.entity';

export default class TrainerWorkoutSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialTrainerWorkout = [];
    const trainer = await dataSource.createEntityManager().find(Trainer);
    const workout = await dataSource.createEntityManager().find(Workout);

    for (let i = 0; i < trainer.length; i++) {
      for (let j = 0; j < workout.length; j++) {
        if (Math.random() > 0.2) {
          specialTrainerWorkout.push({
            trainer_id: trainer[i].id,
            workout_id: workout[j].id,
          });
        }
      }
    }
    try {
      await dataSource
        .createEntityManager()
        .createQueryBuilder()
        .insert()
        .into('trainer_workouts')
      .values(specialTrainerWorkout)
        .execute();
      console.log('TrainerWorkout seeding successful!');
    } catch (error) {
      console.error(
        'Error occurred while seeding workout equipments',
        error.message,
      );
    }
  }
}
