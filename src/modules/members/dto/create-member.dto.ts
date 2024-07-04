import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';

export class CreateMemberDto extends CreateUserDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // membership_plan_id: number;
  // @ApiProperty({ required: false })
  // @IsNotEmpty()
  // @IsOptional()
  // trainer_id: number;
  // @ApiProperty({ required: false })
  // @IsNotEmpty()
  // @IsDateString()
  // start_date: string;
  // @ApiProperty({ required: false })
  // @IsNotEmpty()
  // @IsString()
  // @IsDateString()
  // end_date: string;
}
