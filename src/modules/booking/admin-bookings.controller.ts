import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { RoleValue } from 'src/commons/enums/role-enum';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CreateBookingDto, CreateListBookingDto, FindAllBookingDto } from './dto';
import { BookingsService } from './bookings.service';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { Booking } from 'src/entities/booking.entity';
import { RoleGuard } from '../auth/guard/role.guard';

@ApiTags('bookings')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('admin/bookings')
@UseGuards(RoleGuard)
@RequireRole(RoleValue.ADMIN)
export class AdminBookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.adminCreateBooking(createBookingDto);
  }

  @Get()
  async findAllBookings(@Query() dto: FindAllBookingDto) {
    return this.bookingsService.adminGetAllBookings(dto);
  }

  // @Post(':id/approve')
  // async approveBooking(@Body() booking: Booking) {
  //   return this.bookingsService.approveBooking(booking);
  // }

  @Post('/solver-schedule')
  async solverSchedule(@Body() data: any) {
    return this.bookingsService.solverSchedule();
  }

  @Post('/list')
  async createListBooking(@Body() dto: CreateListBookingDto) {
    return this.bookingsService.createListBooking(dto);
  }
}
