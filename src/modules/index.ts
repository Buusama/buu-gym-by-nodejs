import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { BookingsModule } from './booking/bookings.module';
import { DashboardModule } from './dashboard/dashboard.module';
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
import { ServicesModule } from './services/services.module';
import { SessionsModule } from './sessions/sessions.module';
import { TrainersModule } from './trainers/trainers.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
class ApplicationModular {
  public static register() {
    return [
      UsersModule,
      AuthModule,
      DashboardModule,
      AuditObserverModule,
      MembersModule,
      TrainersModule,
      DaysOffRequestModule,
      WorkoutsModule,
      ServicesModule,
      MembershipPlansModule,
      AwsModule,
      FastApiModule,
      BookingsModule,
      RoomsModule,
      EquipmentModule,
      EquipmentCategoryModule,
      SessionsModule,
      AttendanceModule,
      // PersonalWorkoutModule,
      // PaymentsModule,
    ];
  }
}

export default ApplicationModular;
