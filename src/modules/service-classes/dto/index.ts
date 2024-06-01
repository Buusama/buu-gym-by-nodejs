import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetServiceClassesByServiceIdAndDayDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
