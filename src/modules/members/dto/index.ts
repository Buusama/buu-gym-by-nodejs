import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMemberMembershipsDto {
  @ApiProperty()
  @IsNotEmpty()
  membership_plan_id: number;

  @ApiProperty()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  note: string;
}

export class createMemberMembershipPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  payment_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  payment_amount: number;

  @ApiProperty()
  @IsNotEmpty()
  payment_type: string;

  @ApiProperty()
  @IsNotEmpty()
  payment_note: string;
}
