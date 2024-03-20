import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateMemberDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  package_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  trainer_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  end_date: string;
}
