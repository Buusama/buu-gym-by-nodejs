import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMembershipPlanDto {
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
  duration: number;

  @ApiProperty({ required: false })
  free_service: number[];

  @ApiProperty({ required: false })
  description: string;
}
