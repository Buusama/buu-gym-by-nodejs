import { Injectable } from '@nestjs/common';
import { PageService } from '../pagination/page.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { MembershipPayment } from '../../entities/membership-payment.entity';
import { PageResponseDto } from '../pagination/dto/page-response.dto';

@Injectable()
export class PaymentsService extends PageService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(MembershipPayment)
    private membershipPaymentRepository: Repository<MembershipPayment>,
  ) {
    super();
  }

  async findAllMembershipPayments(memberId: number) {
    return await this.membershipPaymentRepository
      .createQueryBuilder('membershipPayment')
      .select([
        'membershipPayment.id AS MembershipPaymentId',
        'membershipPayment.payment_date AS PaymentDate',
        'membershipPayment.payment_amount AS Amount',
        'membershipPayment.payment_date AS PaymentDate',
        'membershipPayment.payment_type AS PaymentMethod',
      ])
      .where('membershipPayment.member_id = :memberId', { memberId })
      .getRawMany()
      .then((response) => new PageResponseDto(response));
  }
}
