import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class GetSchedulesByServiceIdAndDayDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: string;
}