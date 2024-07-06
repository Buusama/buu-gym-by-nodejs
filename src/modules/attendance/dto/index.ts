import { ApiProperty } from "@nestjs/swagger";
import { PageDto } from "../../../modules/pagination/dto/page.dto";

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
    start_date: string;

    @ApiProperty({ required: false })
    end_date: string;

    @ApiProperty({ required: false })
    member_id: number;
}