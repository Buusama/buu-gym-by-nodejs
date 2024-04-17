import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RequireRole } from "src/commons/decorators/require-role.decorator";
import { UserInRequest } from "src/commons/decorators/user-in-request.decorator";
import { RoleValue } from "src/commons/enums/role-enum";
import { User } from "src/entities/user.entity";
import { TransformInterceptor } from "src/interceptors/transform.interceptor";
import { RoleGuard } from "../auth/guard/role.guard";
import { PageResponseDto } from "../pagination/dto/page-response.dto";
import { BookingsService } from "./bookings.service";
import { MemberCreateBookingDto } from "./dto";


@ApiTags('bookings')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('bookings')
@UseGuards(RoleGuard)
@RequireRole(RoleValue.MEMBER)
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    async createBooking(@UserInRequest() user: User, @Body() dto: MemberCreateBookingDto): Promise<PageResponseDto<any>> {
        return this.bookingsService.memberCreateBooking(user, dto);
    }
}