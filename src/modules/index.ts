import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuditObserverModule } from './observers/audit-observer.module';
import { MembersModule } from './members/members.module';
import { AwsModule } from './aws/aws.module';
import { MembershipPlansModule } from './membership_plans/membership_plans.module';
import { TrainersModule } from './trainers/trainers.module';
import { ServicesModule } from './services/services.module';
import { SchedulesModule } from './schedules/schedules.module';
import { BookingsModule } from './booking/bookings.module';
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
      SchedulesModule,
      BookingsModule,
    ];
  }
}

export default ApplicationModular;
