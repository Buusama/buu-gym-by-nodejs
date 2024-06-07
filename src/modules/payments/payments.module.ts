import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { MembershipPayment } from 'src/entities/membership-payment.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
@Module({
  imports: [TypeOrmModule.forFeature([Transaction, MembershipPayment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
