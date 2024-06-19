import { ApiProperty } from "@nestjs/swagger";

export class ServiceSessionDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

}