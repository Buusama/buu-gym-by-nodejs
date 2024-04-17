import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { PageDto } from "src/modules/pagination/dto/page.dto";

export class CreateBookingDto {
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    schedule_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    member_id: number;

    @ApiProperty()
    @IsString()
    note: string;
}

export class MemberCreateBookingDto {
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    schedule_id: number;

    @ApiProperty()
    @IsString()
    note: string;
}


export class UpdateBookingDto {
    @ApiProperty()
    @IsNotEmpty()
    schedule_id: number;

    @ApiProperty()
    @IsNotEmpty()
    member_id: number;

    @ApiProperty()
    @IsString()
    note: string;
}
export class FindBookingDto {
    @ApiProperty()
    @IsNotEmpty()
    schedule_id: number;

    @ApiProperty()
    @IsNotEmpty()
    member_id: number;
}

export class FindAllBookingDto extends PageDto {
}