import { ApiProperty } from "@nestjs/swagger";
import { PageDto } from "src/modules/pagination/dto/page.dto";

export class CreateAttendanceDto  {
    @ApiProperty ()
    date: Date;

    @ApiProperty ()
    member_id: number;

    @ApiProperty ()
    time_in: string;

    @ApiProperty ()
    time_out: string;
}


export class FindAllAttendanceDto extends PageDto {
    @ApiProperty({ required: false })
    date: Date;

    @ApiProperty({ required: false })
    member_id: number;

    @ApiProperty({ required: false })
    time_in: string;

    @ApiProperty({ required: false })
    time_out: string;
}