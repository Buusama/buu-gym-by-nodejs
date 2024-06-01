import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetListServiceServiceClassesByDayDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
