import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import BodyMeasurementSeeder from './service_seeders/body_measurement.seeder';
import BookingSeeder from './service_seeders/booking.seeder';
import EquipmentCategorySeeder from './service_seeders/equipment_category.seeder';
import EquipmentSeeder from './service_seeders/equipment.seeder';
import MemberSeeder from './service_seeders/member.seeder';
import MembershipPlanSeeder from './service_seeders/membership_plan.seeder';
import RoomSeeder from './service_seeders/room.seeder';
import ServiceClassesSeeder from './service_seeders/service_classes.seeder';
import ServiceSeeder from './service_seeders/service.seeder';
import ServiceWorkoutSeeder from './service_seeders/service_workout.seeder';
import StaffSeeder from './service_seeders/staff.seeder';
import TrainerSeeder from './service_seeders/trainer.seeder';
import UserSeeder from './service_seeders/user.seeder';
import WorkoutSeeder from './service_seeders/workout.seeder';
import WorkoutEquipmentSeeder from './service_seeders/workout_equipment.seeder';

export default class SeederManager extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await new UserSeeder().run(dataSource);
    await new MembershipPlanSeeder().run(dataSource);
    await new StaffSeeder().run(dataSource);
    await new TrainerSeeder().run(dataSource);
    await new MemberSeeder().run(dataSource);
    await new BodyMeasurementSeeder().run(dataSource);
    await new WorkoutSeeder().run(dataSource);
    await new EquipmentCategorySeeder().run(dataSource);
    await new WorkoutEquipmentSeeder().run(dataSource);
    await new ServiceSeeder().run(dataSource);
    await new ServiceWorkoutSeeder().run(dataSource);
    await new ServiceClassesSeeder().run(dataSource);
    await new BookingSeeder().run(dataSource);
    await new RoomSeeder().run(dataSource);
    await new EquipmentSeeder().run(dataSource);
  }
}
