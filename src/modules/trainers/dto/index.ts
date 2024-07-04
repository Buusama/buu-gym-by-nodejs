import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MemberGenderValue } from '../../../commons/enums/members/member-gender';
import { MemberStatusValue } from '../../../commons/enums/members/member-status';
import { TypeEnumLabel } from '../../../commons/enums/sort/type-enum';
import { Trainer } from '../../../entities/trainer.entity';
import { PageDto } from '../../../modules/pagination/dto/page.dto';
import { IsUnique } from '../../../validators/unique-column.validator';

export class GetListTrainersDto extends PageDto {
  @ApiProperty({ required: false, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;

  @ApiProperty({ required: false })
  field: string;

  @ApiProperty({ required: false, enum: TypeEnumLabel, type: 'string' })
  type: string;

  @ApiProperty({ required: false })
  value: string;
}

export class CreateTrainerDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  avatar?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  certificate?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birth_date: string;

  @ApiProperty({ enum: MemberGenderValue, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsEnum(MemberGenderValue)
  gender: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUnique(Trainer)
  phone: string;

  @ApiProperty({ required: false })
  @IsString()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ enum: MemberStatusValue, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsEnum(MemberStatusValue)
  status: number;

  @ApiProperty({ required: false })
  @IsString()
  note: string;

  @ApiProperty({ required: false })
  @IsString()
  facebook: string;
}

export class UpdateTrainerDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  avatar?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  certificate?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birth_date: string;

  @ApiProperty({ enum: MemberGenderValue, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsEnum(MemberGenderValue)
  gender: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: false })
  @IsString()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ enum: MemberStatusValue, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsEnum(MemberStatusValue)
  status: number;

  @ApiProperty({ required: false })
  @IsString()
  note: string;

  @ApiProperty({ required: false })
  @IsString()
  facebook: string;
}
