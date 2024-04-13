import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

export class UpdateMemberDto extends UpdateUserDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  package_id: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  trainer_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  start_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @IsOptional()
  end_date: string;
}
