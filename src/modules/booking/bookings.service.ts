import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { SchedulesService } from '../schedules/schedules.service';
import { ServicesService } from '../services/services.service';
import { CreateBookingDto, MemberCreateBookingDto } from './dto';

@Injectable()
export class BookingsService extends PageService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {
    super();
  }

  async adminCreateBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<PageResponseDto<any>> {
    const params = { ...createBookingDto };
    const booking = this.bookingRepository.create(params);
    await this.bookingRepository.save(booking);

    const queryBuilder = this.bookingRepository
      .createQueryBuilder('booking')
      .select([
        'service.name AS serviceName',
        'schedule.date AS date',
        'schedule.time AS time',
        'booking.id AS bookingId',
        'booking.note AS notes',
      ])
      .leftJoin('booking.schedule', 'schedule')
      .leftJoin('schedule.service', 'service')
      .where('booking.id = :bookingId', { bookingId: booking.id })
      .getRawOne();

    return new PageResponseDto(queryBuilder);
  }

  async memberCreateBooking(
    user: User,
    dto: MemberCreateBookingDto,
  ): Promise<PageResponseDto<any>> {
    const params = { ...dto, member_id: user.member.id };
    const booking = this.bookingRepository.create(params);
    await this.bookingRepository.save(booking);
    return new PageResponseDto(booking);
  }

  async getBooking(user: User, id: number): Promise<PageResponseDto<any>> {
    const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.schedule', 'schedule')
      .leftJoin('schedule.service', 'service')
      .where('booking.id = :id', { id })
      .select([
        'service.name AS serviceName',
        'schedule.date AS scheduleDate',
        'schedule.time AS scheduleTime',
        'service.price AS servicePrice',
        'booking.id AS bookingId',
        'booking.member_id AS memberId',
        'booking.participant AS participant',
        'booking.payment_method AS payment_method',
        'booking.note AS notes',
      ])
      .getRawOne();
    // console.log('user', user);
    // console.log('booking', booking);
    if (booking.memberId !== user.member.id) {
      throw new Error('Unauthorized');
    }
    return new PageResponseDto(booking);
  }

  async getBookings(user: User): Promise<PageResponseDto<any>> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.schedule', 'schedule')
      .leftJoin('schedule.service', 'service')
      .where('booking.member_id = :memberId', { memberId: user.member.id })
      .select([
        'service.name AS serviceName',
        'schedule.date AS scheduleDate',
        'schedule.time AS scheduleTime',
        'service.price AS servicePrice',
        'booking.id AS bookingId',
        'booking.member_id AS memberId',
        'booking.participants AS participants',
        'booking.payment_method AS payment_method',
        'booking.note AS notes',
      ])
      .getRawMany();
    return new PageResponseDto(bookings);
  }

  async adminGetAllBookings(): Promise<PageResponseDto<any>> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.schedule', 'schedule')
      .leftJoin('schedule.service', 'service')
      .select([
        'service.name AS serviceName',
        'schedule.date AS scheduleDate',
        'schedule.time AS scheduleTime',
        'service.price AS servicePrice',
        'booking.id AS bookingId',
        'booking.member_id AS memberId',
        'booking.participants AS participants',
        'booking.payment_method AS payment_method',
        'booking.note AS notes',
      ])
      .getRawMany();
    return new PageResponseDto(bookings);
  }
}
