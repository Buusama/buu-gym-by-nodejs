import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { BookingsModule } from './booking/bookings.module';
import { DaysOffRequestModule } from './days-off-requests/days_off_requests.module';
import { EquipmentCategoryModule } from './equipment-category/equipment-category.module';
import { EquipmentModule } from './equipment/equipment.module';
import { FastApiModule } from './fastapi/fastapi.module';
import { MembersModule } from './members/members.module';
import { MembershipPlansModule } from './membership_plans/membership_plans.module';
import { AuditObserverModule } from './observers/audit-observer.module';
// import { PaymentsModule } from './payments/payments.module';
// import { PersonalWorkoutModule } from './personal-workout/personal-workout.module';
import { RoomsModule } from './rooms/rooms.module';
import { ServiceClassesModule } from './service-classes/service-classes.module';
import { ServicesModule } from './services/services.module';
import { TrainersModule } from './trainers/trainers.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
class ApplicationModular {
  public static register() {
    return [
      UsersModule,
      AuthModule,
      AuditObserverModule,
      MembersModule,
      TrainersModule,
      DaysOffRequestModule,
      WorkoutsModule,
      ServicesModule,
      MembershipPlansModule,
      AwsModule,
      FastApiModule,
      ServiceClassesModule,
      BookingsModule,
      RoomsModule,
      EquipmentModule,
      EquipmentCategoryModule,
      // PersonalWorkoutModule,
      // PaymentsModule,
    ];
  }
}

export default ApplicationModular;
