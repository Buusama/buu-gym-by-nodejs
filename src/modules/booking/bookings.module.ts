import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Member } from 'src/entities/member.entity';
import { ServiceClass } from 'src/entities/service-class.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdminBookingsController } from './admin-bookings.controller';
import { WorkoutEquipment } from 'src/entities/workout-equipment.entity';
import { ServiceWorkout } from 'src/entities/service-workout.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { EquipmentCategory } from 'src/entities/equipment-category.entity';
import { FastApiModule } from '../fastapi/fastapi.module';
import { Trainer } from 'src/entities/trainer.entity';
import { Workout } from 'src/entities/workout.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      ServiceWorkout,
      WorkoutEquipment,
      Booking,
      Member,
      ServiceClass,
      EquipmentCategory,
      Equipment,
      Trainer,
      Workout,
    ]),
    FastApiModule,
  ],
  controllers: [BookingsController, AdminBookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
