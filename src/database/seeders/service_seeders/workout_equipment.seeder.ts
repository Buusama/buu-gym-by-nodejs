import { Seeder } from '@jorgebodega/typeorm-seeding';
import { WorkoutEquipment } from '../../../entities/workout-equipment.entity';
import { DataSource } from 'typeorm';

export default class WorkoutEquipmentSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const specialWorkoutEquipment = []
    
    for (let i = 1; i <= 20; i++) {
      for (let j = 1; j <= 25; j++) {
        if (Math.random() > 0.5) {
          specialWorkoutEquipment.push({
            workout_id: i,
            equipment_id: j
          })
        }
      }
    }

    try {
      await dataSource
        .createEntityManager()
        .save(WorkoutEquipment, specialWorkoutEquipment);
      console.log('Workout equipments seeded successfully');
    } catch (error) {
      console.error(
        'Error occurred while seeding workout equipments',
        error.message,
      );
    }
  }
}
