import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePackageDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    type: number;

    @ApiProperty()
    usage_type: number;

    @ApiProperty()
    usage_limit: number;

    @ApiProperty()
    free_service: string;

    @ApiProperty()
    status: number;

    @ApiProperty()
    note: string;

    @ApiProperty()
    commission_for_sellers: number;

    @ApiProperty()
    referral_commission: number;

    @ApiProperty()
    employee_referral_commission: number;

    @ApiProperty()
    commission_status: number;
}