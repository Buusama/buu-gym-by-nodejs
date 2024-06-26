import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ServiceSessionDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

}

export class createServiceDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    duration: number;

    @ApiProperty()
    max_participants: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    service_type: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    thumbnail: string;
}