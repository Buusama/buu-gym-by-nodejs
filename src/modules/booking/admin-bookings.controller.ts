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
import { RoleValue } from '../../commons/enums/role-enum';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { BookingsService } from './bookings.service';
import { CreateListBookingDto, FindAllBookingDto, SolverScheduleDto } from './dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';

@ApiTags('bookings')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('admin/bookings')
@UseGuards(RoleGuard)
@RequireRole(RoleValue.ADMIN)
export class AdminBookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post()
  async createListBooking(@Body() dto: CreateListBookingDto) {
    return this.bookingsService.createListBooking(dto);
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
  async solverSchedule(@Body() solverScheduleDto: SolverScheduleDto) {
    const { startDate, endDate, extraBookings } = solverScheduleDto;
    return await this.bookingsService.solverSchedule(startDate, endDate, extraBookings);
  }

  @Put('/save-schedule')
  async saveSchedule(@Body() data: any[]) {
    return this.bookingsService.saveSchedule(data);
  }
  @Get(':id/recommend-trainers')
  async recommendTrainer(@Param('id') id: number) {
    return this.bookingsService.recommendTrainers(id);
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: number) {
    return this.bookingsService.deleteBooking(id);
  }


}
