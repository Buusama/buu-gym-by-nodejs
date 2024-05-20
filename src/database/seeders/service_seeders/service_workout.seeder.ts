import { Seeder } from '@jorgebodega/typeorm-seeding';
import { ServiceWorkout } from '../../../entities/service-workout.entity';
import { Service } from '../../../entities/service.entity';
import { Workout } from '../../../entities/workout.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export default class ServiceWorkoutSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialServiceWorkout = [];
    const service = await dataSource.createEntityManager().find(Service);
    const workout = await dataSource.createEntityManager().find(Workout);

    for (let i = 0; i < service.length; i++) {
      for (let j = 0; j < workout.length; j++) {
        if (faker.number.int({ min: 0, max: 10 }) < 2) {
          specialServiceWorkout.push({
            service_id: service[i].id,
            workout_id: workout[j].id,
          });
        }
      }
    }
    try {
      await dataSource
        .createEntityManager()
        .save(ServiceWorkout, specialServiceWorkout);
      console.log('ServiceWorkout seeding successful!');
    } catch (error) {
      console.error(
        'Error occurred while seeding workout equipments',
        error.message,
      );
    }
  }
}
