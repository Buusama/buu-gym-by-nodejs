import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  type: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  usage_type: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  usage_limit: number;

  @ApiProperty({ required: false })
  free_service: number[];

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @ApiProperty({ required: false })
  note: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  commission_for_sellers: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  referral_commission: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  employee_referral_commission: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  commission_status: number;
}
