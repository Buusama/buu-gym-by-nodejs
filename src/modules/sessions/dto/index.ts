import { ApiProperty } from "@nestjs/swagger";

export class SessionDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    service_id: number;

    @ApiProperty()
    description: string;
}