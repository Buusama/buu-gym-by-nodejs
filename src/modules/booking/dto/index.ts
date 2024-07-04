import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsString, Validate } from 'class-validator';
import { TypeEnumLabel } from '../../../commons/enums/sort/type-enum';
import { PageDto } from '../../../modules/pagination/dto/page.dto';
import { UniqueTrainingTimesValidator } from '../../../validators/unique-training-times.validator';

export class CreateBookingDto {
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
  service_id?: number;

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
  start_time: string

  @ApiProperty()
  end_time: string
}

export class MemberCreateBookingDto {
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
  start_time: string

  @ApiProperty()
  end_time: string
}

export class UpdateBookingDto {
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
  member_id: number;

  @ApiProperty()
  trainer_id: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  start_time: string;

  @ApiProperty()
  end_time: string;

  @ApiProperty()
  workout_id: number;
}

export class FindAllBookingDto extends PageDto {
  @ApiProperty({ required: false })
  field: string;

  @ApiProperty({ required: false, enum: TypeEnumLabel, type: 'string' })
  type: string;

  @ApiProperty({ required: false })
  value: string;

  @ApiProperty({ required: false })
  date: string;

  @ApiProperty({ required: false })
  start_time: string;

  @ApiProperty({ required: false })
  end_time: string;

  @ApiProperty({ required: false })
  workout_id: number;

  @ApiProperty({ required: false })
  start_date: string;

  @ApiProperty({ required: false })
  end_date: string;

  @ApiProperty({ required: false })
  status: number;
}

export class CreateListBookingDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  serviceId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  memberId: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @Validate(UniqueTrainingTimesValidator)
  trainingTimes: {
    dayOfWeek: number;
    start_time: string;
    end_time: string;
    workout: number;
    trainer: number;
  }[];
}

export class MemberCreateListBookingDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  serviceId?: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @Validate(UniqueTrainingTimesValidator)
  trainingTimes: {
    dayOfWeek: number;
    start_time: string;
    end_time: string;
    workout: number;
    trainer: number;
  }[];
}

class ExtraBooking {
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  start_time: string;

  @IsNotEmpty()
  end_time: string;

  @IsNotEmpty()
  workout_id: number;

  @IsNotEmpty()
  member_id: number;

  @IsNotEmpty()
  trainer_id?: number;
}


export class SolverScheduleDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @Type(() => ExtraBooking)
  extraBookings?: ExtraBooking[];
}
