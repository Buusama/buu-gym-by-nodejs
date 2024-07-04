import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../../entities/booking.entity';
import { Member } from '../../entities/member.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Module, Session } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdminBookingsController } from './admin-bookings.controller';
import { Equipment } from '../../entities/equipment.entity';
import { EquipmentCategory } from '../../entities/equipment-category.entity';
import { FastApiModule } from '../fastapi/fastapi.module';
import { Trainer } from '../../entities/trainer.entity';
import { Workout } from '../../entities/workout.entity';
import { ServicesModule } from '../services/services.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UniqueTrainingTimesValidator } from '../../validators/unique-training-times.validator';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      Booking,
      Member,
      EquipmentCategory,
      Equipment,
      Trainer,
      Workout,
    ]),
    FastApiModule,
    ServicesModule,
    SessionsModule,
  ],
  controllers: [BookingsController, AdminBookingsController],
  providers: [BookingsService, UniqueTrainingTimesValidator],
  exports: [BookingsService],
})
export class BookingsModule { }
