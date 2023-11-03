import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  Validate,
} from 'class-validator';
import { EmailUniqueValidator } from '../../../validators/email-unique.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @Validate(EmailUniqueValidator)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
