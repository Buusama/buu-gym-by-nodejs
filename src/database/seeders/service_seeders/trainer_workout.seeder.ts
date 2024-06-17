import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { TrainerWorkout } from '../../../entities/trainer-workout.entity';
import { Trainer } from '../../../entities/trainer.entity';
import { DataSource } from 'typeorm';
import { Workout } from '../../../entities/workout.entity';

export default class TrainerWorkoutSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialTrainerWorkout = [];
    const trainer = await dataSource.createEntityManager().find(Trainer);
    const workout = await dataSource.createEntityManager().find(Workout);

    for (let i = 0; i < trainer.length; i++) {
      for (let j = 0; j < workout.length; j++) {
        if (faker.number.int({ min: 0, max: 10 }) < 7) {
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
        .save(TrainerWorkout, specialTrainerWorkout);
      console.log('TrainerWorkout seeding successful!');
    } catch (error) {
      console.error(
        'Error occurred while seeding workout equipments',
        error.message,
      );
    }
  }
}
