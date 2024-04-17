import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetListServiceSchedulesByDayDto  {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: string;
}
