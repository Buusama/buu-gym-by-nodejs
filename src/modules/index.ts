import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { BookingsModule } from './booking/bookings.module';
import { EquipmentCategoryModule } from './equipment-category/equipment-category.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MembersModule } from './members/members.module';
import { MembershipPlansModule } from './membership_plans/membership_plans.module';
import { AuditObserverModule } from './observers/audit-observer.module';
import { PersonalWorkoutModule } from './personal-workout/personal-workout.module';
import { RoomsModule } from './rooms/rooms.module';
import { ServiceClassesModule } from './service-classes/service-classes.module';
import { ServicesModule } from './services/services.module';
import { TrainersModule } from './trainers/trainers.module';
import { UsersModule } from './users/users.module';
class ApplicationModular {
  public static register() {
    return [
      UsersModule,
      AuthModule,
      AuditObserverModule,
      MembersModule,
      TrainersModule,
      MembershipPlansModule,
      AwsModule,
      ServicesModule,
      ServiceClassesModule,
      BookingsModule,
      RoomsModule,
      EquipmentModule,
      EquipmentCategoryModule,
      PersonalWorkoutModule,
    ];
  }
}

export default ApplicationModular;
