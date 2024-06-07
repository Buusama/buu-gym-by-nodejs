import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PageDto } from 'src/modules/pagination/dto/page.dto';

export class CreateBookingDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  service_class_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  workout_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  member_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  trainer_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  participants: number;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  payment_method: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;
}

export class MemberCreateBookingDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  service_class_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  workout_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  trainer_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  participants: number;

  @ApiProperty()
  note: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  payment_method: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;
}

export class UpdateBookingDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  service_class_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  workout_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  member_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  trainer_id: number;
}

export class FindBookingDto {
  @ApiProperty()
  service_class_id: number;

  @ApiProperty()
  member_id: number;

  @ApiProperty()
  trainer_id: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  workout_id: number;
}

export class FindAllBookingDto extends PageDto {
  @ApiProperty({ required: false })
  service_class_id: number;

  @ApiProperty({ required: false })
  member_id: number;

  @ApiProperty({ required: false })
  trainer_id: number;

  @ApiProperty({ required: false })
  date: string;

  @ApiProperty({ required: false })
  time: string;

  @ApiProperty({ required: false })
  workout_id: number;
}
