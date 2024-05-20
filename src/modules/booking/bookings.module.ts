import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Member } from 'src/entities/member.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Module } from '@nestjs/common';
import { AdminBookingsController } from './admin-bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Member, Schedule])],
  controllers: [BookingsController, AdminBookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
