import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  avatar?: any;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birth_date?: Date;

  @ApiProperty({ enum: ['M', 'F'] })
  gender?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiProperty({ enum: [0, 1] })
  @IsOptional()
  @IsEnum([0, 1])
  status?: number;
}
