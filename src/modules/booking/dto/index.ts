import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PageDto } from 'src/modules/pagination/dto/page.dto';

export class CreateBookingDto {
  @ApiProperty()
  // @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  service_class_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  personal_workout_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  member_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  participants: number;

  @ApiProperty()
  @IsString()
  note: string;
}

export class MemberCreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  service_class_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  personal_workout_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  participants: number;

  @ApiProperty()
  @IsString()
  note: string;
}

export class UpdateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  service_class_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  personal_workout_id: number;

  @ApiProperty()
  @IsNotEmpty()
  member_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  participants: number;

  @ApiProperty()
  @IsString()
  note: string;
}
export class FindBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  service_class_id: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  personal_workout_id: number;

  @ApiProperty()
  @IsNotEmpty()
  member_id: number;
}

export class FindAllBookingDto extends PageDto {}
