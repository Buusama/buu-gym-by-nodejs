import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuditObserverModule } from './observers/audit-observer.module';
import { MembersModule } from './members/members.module';
import { AwsModule } from './aws/aws.module';
class ApplicationModular {
  public static register() {
    return [UsersModule, AuthModule, AuditObserverModule, MembersModule, AwsModule];
  }
}

export default ApplicationModular;
