import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequireRole } from '../../commons/decorators/require-role.decorator';
import { UserInRequest } from '../../commons/decorators/user-in-request.decorator';
import { RoleValue } from '../../commons/enums/role-enum';
import { User } from '../../entities/user.entity';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { BookingsService } from './bookings.service';
import { CreateListBookingDto, MemberCreateBookingDto, MemberCreateListBookingDto } from './dto';
import { PublicRoute } from '../../commons/decorators/public-route.decorator';

@ApiTags('bookings')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('bookings')
@RequireRole(RoleValue.MEMBER)
@UseGuards(RoleGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }
  @Post()
  async createBooking(
    @UserInRequest() user: User,
    @Body() dto: MemberCreateListBookingDto,
  ) {
    return this.bookingsService.memberCreateListBooking(user, dto);
  }

  @Get(':id')
  async getBooking(
    @UserInRequest() user: User,
    @Param('id') id: number,
  ): Promise<PageResponseDto<any>> {
    return this.bookingsService.getBooking(user, id);
  }

  @Get()
  async getBookings(
    @UserInRequest() user: User,
  ): Promise<PageResponseDto<any>> {
    return this.bookingsService.getBookings(user);
  }

  @Delete(':id')
  async cancelBooking(
    @UserInRequest() user: User,
    @Param('id') id: number,
  ) {
    return this.bookingsService.memberCancelBooking(user, id);
  }

  @Put(':id/confirm')
  async confirmBooking(
    @UserInRequest() user: User,
    @Param('id') id: number,
  ) {
    return this.bookingsService.confirmBooking(user, id);
  }
}
