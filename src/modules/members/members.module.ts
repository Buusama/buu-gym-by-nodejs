import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member.entity';
import { AwsModule } from '../aws/aws.module';
import { UniqueColumnValidator } from '../../validators/unique-column.validator';
import { User } from '../../entities/user.entity';
import { MembershipPlan } from '../../entities/membership-plan.entity';
import { Trainer } from '../../entities/trainer.entity';
import { MemberMembership } from '../../entities/member-membership.entity';
import { MembershipPayment } from '../../entities/membership-payment.entity';
import { Transaction } from '../../entities/transaction.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Member,
      User,
      MembershipPlan,
      Trainer,
      MemberMembership,
      MembershipPayment,
      Transaction,
    ]),
    AwsModule,
  ],
  controllers: [MembersController],
  providers: [MembersService, UniqueColumnValidator],
  exports: [MembersService],
})
export class MembersModule {}
