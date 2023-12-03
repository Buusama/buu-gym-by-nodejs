import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MemberGenderValue } from 'src/commons/enums/members/member-gender';
import { MemberStatusValue } from 'src/commons/enums/members/member-status';
import { Member } from 'src/entities/member.entity';
import { IsUnique } from 'src/validators/unique-column.validator';

export class UpdateMemberDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  avatar?: any;

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
}
