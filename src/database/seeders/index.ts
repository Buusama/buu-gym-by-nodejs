import UserSeeder from "./service_seeders/user.seeder";
import MembershipPlanSeeder from "./service_seeders/membership_plan.seeder";
import StaffSeeder from "./service_seeders/staff.seeder";
import TrainerSeeder from "./service_seeders/trainer.seeder";
import MemberSeeder from "./service_seeders/member.seeder";
import BodyMeasurementSeeder from "./service_seeders/body_measurement.seeder";
import WorkoutSeeder from "./service_seeders/workout.seeder";
import EquipmentSeeder from "./service_seeders/equipment.seeder";
import WorkoutEquipmentSeeder from "./service_seeders/workout_equipment.seeder";
import ServiceSeeder from "./service_seeders/service.seeder";
import ServiceWorkoutSeeder from "./service_seeders/service_workout.seeder";
import ScheduleSeeder from "./service_seeders/schedule.seeder";
import { DataSource } from "typeorm";
import { Seeder } from "@jorgebodega/typeorm-seeding";

export default class SeederManager extends Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        await new UserSeeder().run(dataSource);
        await new MembershipPlanSeeder().run(dataSource);
        await new StaffSeeder().run(dataSource);
        await new TrainerSeeder().run(dataSource);
        await new MemberSeeder().run(dataSource);
        await new BodyMeasurementSeeder().run(dataSource);
        await new WorkoutSeeder().run(dataSource);
        await new EquipmentSeeder().run(dataSource);
        await new WorkoutEquipmentSeeder().run(dataSource);
        await new ServiceSeeder().run(dataSource);
        await new ServiceWorkoutSeeder().run(dataSource);
        await new ScheduleSeeder().run(dataSource);
    }
}