import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { ServiceClass } from 'src/entities/service-class.entity';
import { ServiceWorkout } from 'src/entities/service-workout.entity';
import { User } from 'src/entities/user.entity';
import { WorkoutEquipment } from 'src/entities/workout-equipment.entity';
import { Repository } from 'typeorm';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { CreateBookingDto, MemberCreateBookingDto } from './dto';
import { EquipmentCategory } from 'src/entities/equipment-category.entity';
import { Equipment } from 'src/entities/equipment.entity';

@Injectable()
export class BookingsService extends PageService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(ServiceClass)
    private readonly serviceClassesRepository: Repository<ServiceClass>,
    @InjectRepository(EquipmentCategory)
    private readonly equipmentCategoryRepository: Repository<EquipmentCategory>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {
    super();
  }

  private async checkEquipment(
    createBookingDto: CreateBookingDto | MemberCreateBookingDto,
  ): Promise<void> {
    const service_class = await this.serviceClassesRepository.findOneBy({
      id: createBookingDto.service_class_id,
    });

    if (!service_class) {
      throw new Error('Service Class not found');
    }

    const { start_date, time } = service_class;

    const requiredEquipment = await this.equipmentCategoryRepository
      .createQueryBuilder('e')
      .innerJoin(WorkoutEquipment, 'we', 'we.equipment_id = e.id')
      .innerJoin(ServiceWorkout, 'sw', 'sw.workout_id = we.workout_id')
      .innerJoin(ServiceClass, 's', 's.service_id = sw.service_id')
      .where('s.id = :service_classId', {
        service_classId: createBookingDto.service_class_id,
      })
      .select('e.id')
      .addSelect('e.max_capacity')
      .getMany();

    const bookingEquipment = await this.bookingRepository
      .createQueryBuilder('b')
      .innerJoin(ServiceClass, 's', 's.id = b.service_class_id')
      .innerJoin(ServiceWorkout, 'sw', 'sw.service_id = s.service_id')
      .innerJoin(WorkoutEquipment, 'we', 'we.workout_id = sw.workout_id')
      .where('s.start_date = :start_date', { start_date })
      .andWhere('s.time = :time', { time })
      .select('we.equipment_id')
      .addSelect('COUNT(we.equipment_id)', 'count')
      .groupBy('we.equipment_id')
      .getRawMany();

    const equipmentCounts = await this.equipmentRepository
      .createQueryBuilder('ed')
      .innerJoin(Equipment, 'e', 'e.id = ed.equipment_id')
      .where('ed.equipment_id IN (:...equipmentIds)', {
        equipmentIds: requiredEquipment.map((e) => e.id),
      })
      .select('e.id')
      .addSelect('COUNT(e.id)', 'count')
      .groupBy('e.id')
      .getRawMany();

    const notEnoughEquipment = requiredEquipment.filter((e) => {
      const required = bookingEquipment.find(
        (be) => be.we_equipment_id === e.id,
      );
      const available = equipmentCounts.find((eq) => eq.e_id === e.id);
      const requiredCount = required ? required.count : 0;
      const availableCount = available ? available.count : 0;
      const maxCapacity = e.max_capacity;

      return requiredCount >= maxCapacity * availableCount;
    });

    if (notEnoughEquipment.length > 0) {
      throw new Error('Not enough equipment');
    }
  }

  private bookingSelectFields() {
    return [
      'service.name AS serviceName',
      'service.price AS servicePrice',
      'serviceClass.date AS serviceClassDate',
      'serviceClass.time AS serviceClassTime',
      'booking.id AS bookingId',
      'booking.member_id AS memberId',
      'booking.participants AS participants',
      'booking.payment_method AS payment_method',
      'booking.note AS notes',
    ];
  }

  private async getBookingDetailsById(id: number) {
    return await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.serviceClass', 'serviceClass')
      .leftJoin('serviceClass.service', 'service')
      .where('booking.id = :id', { id })
      .select(this.bookingSelectFields())
      .getRawOne();
  }

  async adminCreateBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<PageResponseDto<any>> {
    try {
      await this.checkEquipment(createBookingDto);

      const booking = this.bookingRepository.create(createBookingDto);
      await this.bookingRepository.save(booking);

      const bookingDetails = await this.getBookingDetailsById(booking.id);

      return new PageResponseDto(bookingDetails);
    } catch (error) {
      error.message = 'Không đủ thiết bị để phục vụ cho lịch trình này';
      throw new PageResponseDto(null, error.message);
    }
  }

  async memberCreateBooking(
    user: User,
    dto: MemberCreateBookingDto,
  ): Promise<PageResponseDto<any>> {
    try {
      await this.checkEquipment(dto);
      const params = { ...dto, member_id: user.member.id };
      const booking = this.bookingRepository.create(params);
      await this.bookingRepository.save(booking);

      return new PageResponseDto(booking);
    } catch (error) {
      error.message = 'Không đủ thiết bị để phục vụ cho lịch trình này';
      throw new PageResponseDto(null, error.message);
    }
  }

  async getBooking(user: User, id: number): Promise<PageResponseDto<any>> {
    const booking = await this.getBookingDetailsById(id);

    if (booking.memberId !== user.member.id) {
      throw new Error('Unauthorized');
    }

    return new PageResponseDto(booking);
  }

  async getBookings(user: User): Promise<PageResponseDto<any>> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.serviceClass', 'serviceClass')
      .leftJoin('serviceClass.service', 'service')
      .where('booking.member_id = :memberId', { memberId: user.member.id })
      .select(this.bookingSelectFields())
      .getRawMany();

    return new PageResponseDto(bookings);
  }

  async adminGetAllBookings(): Promise<PageResponseDto<any>> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.serviceClass', 'serviceClass')
      .leftJoin('serviceClass.service', 'service')
      .select(this.bookingSelectFields())
      .getRawMany();

    return new PageResponseDto(bookings);
  }
}
