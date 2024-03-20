import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  Validate,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { EmailUniqueValidator } from '../../../validators/email-unique.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from '../../../validators/unique-column.validator';
import { User } from '../../../entities/user.entity';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  gender: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  avatar?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birth_date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUnique(User)
  phone: string;

  @ApiProperty()
  @Validate(EmailUniqueValidator)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  email: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsOptional()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is too weak',
  // })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  facebook: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}
