import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTypeValue } from 'src/commons/enums/services/service-type';
import { Booking } from 'src/entities/booking.entity';
import { EquipmentCategory } from 'src/entities/equipment-category.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { ServiceClass } from 'src/entities/service-class.entity';
import { ServiceWorkout } from 'src/entities/service-workout.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { User } from 'src/entities/user.entity';
import { WorkoutEquipment } from 'src/entities/workout-equipment.entity';
import { Workout } from 'src/entities/workout.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { FastApiService } from '../fastapi/fastapi.service';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import {
  CreateBookingDto,
  CreateListBookingDto,
  CreateServiceTrainerBookingDto,
  FindAllBookingDto,
  MemberCreateBookingDto,
} from './dto';
import * as moment from 'moment';

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
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    private fastApiService: FastApiService,
  ) {
    super();
  }

  private async checkEquipmentAvailability(
    requiredEquipment: EquipmentCategory[],
    date: string,
    time: string,
  ): Promise<boolean> {
    const equipmentIds = requiredEquipment.map((e) => e.id);

    const totalBookingEquipmentServiceClass = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin(
        ServiceClass,
        'serviceClass',
        'serviceClass.id = booking.service_class_id',
      )
      .innerJoin(
        ServiceWorkout,
        'serviceWorkout',
        'serviceWorkout.service_id = serviceClass.service_id',
      )
      .innerJoin(
        WorkoutEquipment,
        'workoutEquipment',
        'workoutEquipment.workout_id = serviceWorkout.workout_id',
      )
      .where('booking.date = :date', { date })
      .andWhere('booking.time = :time', { time })
      .andWhere('workoutEquipment.equipment_id IN (:...equipmentIds)', {
        equipmentIds,
      })
      .select('workoutEquipment.equipment_id')
      .addSelect('COUNT(workoutEquipment.equipment_id) as total')
      .groupBy('workoutEquipment.equipment_id')
      .getRawMany();

    const totalBookingEquipmentWorkout = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin(
        WorkoutEquipment,
        'workoutEquipment',
        'workoutEquipment.workout_id = booking.workout_id',
      )
      .where('booking.date = :date', { date })
      .andWhere('booking.time = :time', { time })
      .andWhere('workoutEquipment.equipment_id IN (:...equipmentIds)', {
        equipmentIds,
      })
      .select('workoutEquipment.equipment_id')
      .addSelect('COUNT(workoutEquipment.equipment_id) as total')
      .groupBy('workoutEquipment.equipment_id')
      .getRawMany();

    for (const equipment of requiredEquipment) {
      const totalServiceClassBookings =
        totalBookingEquipmentServiceClass.find(
          (e) => e.equipment_id === equipment.id,
        )?.total || 0;
      const totalWorkoutBookings =
        totalBookingEquipmentWorkout.find(
          (e) => e.equipment_id === equipment.id,
        )?.total || 0;

      const totalBookings = totalServiceClassBookings + totalWorkoutBookings;

      if (totalBookings >= equipment.max_capacity) {
        return false;
      }
    }

    return true; // Return true only if all equipment have availability
  }

  private async getRequiredEquipment(
    serviceClassId?: number,
    workoutId?: number,
  ): Promise<EquipmentCategory[]> {
    if (serviceClassId) {
      const serviceClass = await this.serviceClassesRepository.findOne({
        where: { id: serviceClassId },
        relations: ['service'],
      });

      if (!serviceClass) {
        throw new ForbiddenException('Service class not found');
      }

      if (serviceClass.service.service_type === ServiceTypeValue.ONLINE) {
        return [];
      }

      return this.equipmentCategoryRepository
        .createQueryBuilder('equipment')
        .innerJoin(WorkoutEquipment, 'workoutEquipment', 'workoutEquipment.equipment_id = equipment.id')
        .innerJoin(ServiceWorkout, 'serviceWorkout', 'serviceWorkout.workout_id = workoutEquipment.workout_id')
        .innerJoin(ServiceClass, 'serviceClass', 'serviceClass.service_id = serviceWorkout.service_id')
        .where('serviceClass.id = :serviceClassId', { serviceClassId })
        .select(['equipment.id', 'equipment.max_capacity'])
        .getMany();
    } else if (workoutId) {
      return this.equipmentCategoryRepository
        .createQueryBuilder('equipment')
        .innerJoin(WorkoutEquipment, 'workoutEquipment', 'workoutEquipment.equipment_id = equipment.id')
        .where('workoutEquipment.workout_id = :workoutId', { workoutId })
        .select(['equipment.id', 'equipment.max_capacity'])
        .getMany();
    }

    return [];
  }

  private async checkDuplicateBookings(
    date: string,
    time: string,
    memberId: number,
  ): Promise<boolean> {
    const booking = await this.bookingRepository.findOne({
      where: { date, time, member_id: memberId },
    });

    return !!booking;
  }


  private bookingSelectFields() {
    return [
      'BookingTrainerUser.name AS bookingTrainerName',
      'booking.date AS date',
      'booking.time AS time',
      'booking.id AS bookingId',
      'booking.member_id AS memberId',
      'booking.participants AS participants',
      'booking.payment_method AS payment_method',
      'booking.note AS notes',
      'booking.status AS status',
      'workout.name AS workoutName',
      'workout.thumbnail AS workoutThumbnail',
      'workout.duration AS workoutDuration',
      'memberUser.name AS memberName',
    ];
  }

  private async getBookingDetailsById(id: number) {
    return await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.serviceClass', 'serviceClass')
      .leftJoin('serviceClass.service', 'service')
      .leftJoin('serviceClass.trainer', 'trainer')
      .leftJoin('trainer.staff', 'staff')
      .leftJoin('staff.user', 'user')
      .leftJoin('booking.workout', 'workout')
      .leftJoin('booking.trainer', 'BookingTrainer')
      .leftJoin('BookingTrainer.staff', 'BookingTrainerStaff')
      .leftJoin('BookingTrainerStaff.user', 'BookingTrainerUser')
      .leftJoin('booking.member', 'member')
      .leftJoin('member.user', 'memberUser')
      .where('booking.id = :id', { id })
      .select(this.bookingSelectFields())
      .getRawOne();
  }

  async getBooking(user: User, id: number): Promise<PageResponseDto<any>> {
    const booking = await this.getBookingDetailsById(id);

    if (booking.memberId !== user.member.id) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    return new PageResponseDto(booking);
  }

  async adminCreateBooking(createBookingDto: CreateBookingDto) {
    const requiredEquipment = await this.getRequiredEquipment(
      createBookingDto.service_class_id,
      createBookingDto.workout_id,
    );
    const checkEquipmentAvailability = await this.checkEquipmentAvailability(
      requiredEquipment,
      createBookingDto.date,
      createBookingDto.time,
    );

    const booking = this.bookingRepository.create(createBookingDto);
    if (!checkEquipmentAvailability) {
      booking.status = 2;
    } else {
      booking.status = 1;
    }

    await this.bookingRepository.save(booking);

    if (!checkEquipmentAvailability) {
      throw new ForbiddenException(
        `Không đủ thiết bị để phục vụ cho lịch ${booking.note}`,
      );
    }
    const bookingDetails = await this.getBookingDetailsById(booking.id);

    return new PageResponseDto(bookingDetails);
  }

  async memberCreateBooking(user: User, dto: MemberCreateBookingDto) {
    const requiredEquipment = await this.getRequiredEquipment(
      dto.service_class_id,
      dto.workout_id,
    );
    const checkEquipmentAvailability = await this.checkEquipmentAvailability(
      requiredEquipment,
      dto.date,
      dto.time,
    );
    const params = { ...dto, member_id: user.member.id };
    const booking = this.bookingRepository.create(params);

    if (!checkEquipmentAvailability) {
      booking.status = 2;
    } else {
      booking.status = 1;
    }

    await this.bookingRepository.save(booking);

    const bookingDetails = await this.getBookingDetailsById(booking.id);

    if (!checkEquipmentAvailability) {
      throw new ForbiddenException(
        'Không đủ thiết bị để phục vụ cho lịch trình này',
      );
    }

    return new PageResponseDto(bookingDetails);
  }

  async getBookings(user: User): Promise<PageResponseDto<any>> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.workout', 'workout')
      .leftJoin('booking.trainer', 'BookingTrainer')
      .leftJoin('BookingTrainer.staff', 'BookingTrainerStaff')
      .leftJoin('BookingTrainerStaff.user', 'BookingTrainerUser')
      .leftJoin('booking.member', 'member')
      .leftJoin('member.user', 'memberUser')
      .where('booking.member_id = :memberId', { memberId: user.member.id })
      .select(this.bookingSelectFields())
      .getRawMany();

    console.log(await this.fastApiService.getData());
    return new PageResponseDto(bookings);
  }

  async adminGetAllBookings(
    dto: FindAllBookingDto,
  ): Promise<PageResponseDto<any>> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.serviceClass', 'serviceClass')
      .leftJoin('serviceClass.service', 'service')
      .leftJoin('serviceClass.trainer', 'trainer')
      .leftJoin('trainer.staff', 'staff')
      .leftJoin('staff.user', 'user')
      .leftJoin('booking.workout', 'workout')
      .leftJoin('booking.trainer', 'BookingTrainer')
      .leftJoin('BookingTrainer.staff', 'BookingTrainerStaff')
      .leftJoin('BookingTrainerStaff.user', 'BookingTrainerUser')
      .leftJoin('booking.member', 'member')
      .leftJoin('member.user', 'memberUser')
      .select(this.bookingSelectFields());

    if (dto.date) {
      bookings.andWhere('booking.date = :date', { date: dto.date });
    }
    if (dto.time) {
      bookings.andWhere('booking.time = :time', { time: dto.time });
    }
    if (dto.workout_id) {
      bookings.andWhere('booking.workout_id = :workout_id', {
        workout_id: dto.workout_id,
      });
    }

    if (dto.field && dto.type && dto.value) {
      if (dto.type === 'like') {
        dto.value = `%${dto.value}%`;
      }
      bookings.andWhere(`${dto.field} ${dto.type} :value`, {
        value: dto.value,
      });
    }

    const result = await bookings.getRawMany();
    return new PageResponseDto(result);
  }

  async solverSchedule() {
    // Get all trainers
    let counter = 1;
    const allTrainers = await this.trainerRepository.find({
      select: ['id'],
    });
    const formattedTrainers = allTrainers.map((trainer) => ({
      id: trainer.id,
    }));

    // Get all workouts
    const workouts = await this.workoutRepository.find({
      select: ['id'],
    });
    const formattedWorkouts = workouts.map((workout) => ({ id: workout.id }));

    // Get the current date
    const now = new Date();
    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight

    // Calculate the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // Set time to end of the day

    // Convert dates to ISO string format
    const startOfWeekISO = startOfWeek.toISOString();
    const endOfWeekISO = endOfWeek.toISOString();

    // Get all bookings within the current week and with workout_id > 0
    const bookings = await this.bookingRepository.find({
      select: ['id', 'date', 'time', 'workout_id', 'trainer_id'],
      where: {
        workout_id: MoreThan(0),
        date: Between(startOfWeekISO, endOfWeekISO),
      },
    });

    counter = 1;
    const formattedBookings = bookings.map((booking) => {
      const dateObj = new Date(booking.date);
      return {
        id: counter++,
        ...booking,
        day: dateObj.getDay(), // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
      };
    });

    counter = 1;
    const bookeds = bookings
      .map((booking) => {
        if (booking.trainer_id) {
          return {
            id: counter++,
            trainer_id: booking.trainer_id,
            booking_id: booking.id,
          };
        }
      })
      .filter(Boolean);

    // Get all trainer schedules
    const trainerSchedules = await this.trainerRepository.find({
      select: ['id', 'work_schedule'],
    });

    // Get all trainer workouts
    const trainerWorkouts = await this.trainerRepository.find({
      select: ['id', 'trainerWorkouts'],
    });

    counter = 1;
    // Format trainer schedules
    const formattedTrainerSchedules = trainerSchedules
      .map((trainer) =>
        trainer.work_schedule.map((schedule) => ({
          id: counter++,
          trainerId: trainer.id,
          day: schedule.day,
          shift: schedule.shift,
        })),
      )
      .flat();

    counter = 1;
    // Format trainer workouts
    const formattedTrainerWorkouts = trainerWorkouts
      .map((trainer) =>
        trainer.trainerWorkouts.map((workout) => ({
          id: counter++,
          trainerId: trainer.id,
          workoutId: workout.workout_id,
        })),
      )
      .flat();

    // Call FastAPI service
    const result = await this.fastApiService.solverSchedule({
      trainers: formattedTrainers,
      workouts: formattedWorkouts,
      bookings: formattedBookings,
      bookeds: bookeds,
      trainer_workout: formattedTrainerWorkouts,
      trainer_schedule: formattedTrainerSchedules,
    });
    return new PageResponseDto(result);
    // console.log(formattedTrainerWorkouts);
    // return new PageResponseDto(formattedTrainerWorkouts);
  }

  async createListBooking(dto: CreateListBookingDto) {
    const { memberId, startDate, endDate, trainingTimes } = dto;
    const validBookings: CreateBookingDto[] = [];
    const invalidBookings: CreateBookingDto[] = [];

    let currentBookingDate = moment(startDate);

    while (currentBookingDate.isSameOrBefore(moment(endDate))) {
      for (const timeSlot of trainingTimes) {
        const { dayOfWeek, start, workout, trainer } = timeSlot;
        let bookingDate = moment(currentBookingDate).day(dayOfWeek);

        // Ensure the booking date is in the future
        if (bookingDate.isBefore(moment(), 'day')) {
          bookingDate = moment(bookingDate).add(7, 'days');
        }

        const newBooking: CreateBookingDto = {
          member_id: memberId,
          date: bookingDate.format('YYYY-MM-DD'),
          service_class_id: 0,
          time: start,
          workout_id: workout,
          trainer_id: trainer,
          participants: 1,
          payment_method: 1,
          note: `Đặt lịch hằng tuần thứ ${dayOfWeek} lúc ${start}`,
        };

        // Check required equipment and duplicate bookings in parallel
        const [requiredEquipment, checkDuplicateBookings] = await Promise.all([
          this.getRequiredEquipment(null, newBooking.workout_id),
          this.checkDuplicateBookings(newBooking.date, newBooking.time, newBooking.member_id)
        ]);

        const checkEquipmentAvailability = await this.checkEquipmentAvailability(
          requiredEquipment,
          newBooking.date,
          newBooking.time
        );

        if (checkEquipmentAvailability && !checkDuplicateBookings) {
          validBookings.push(newBooking);
        } else {
          invalidBookings.push(newBooking);
        }
      }

      // Move to the next week
      currentBookingDate = currentBookingDate.add(1, 'week');
    }

    if (invalidBookings.length > 0) {
      // Throw an exception if there are any invalid bookings
      throw new BadRequestException({
        message: `Các lịch sau không thể đặt: ${invalidBookings.map((b) => b.note).join(', ')}`,
      });
    }
    else {
      // Save all valid bookings
      await this.bookingRepository.save(validBookings);
    }

    return new PageResponseDto(validBookings);
  }

  async createServiceTrainerBooking(
    dto: CreateServiceTrainerBookingDto,
  ) {
    const { memberId, serviceId, numberOfWeeks, trainingTimes } = dto;
    const validBookings: CreateBookingDto[] = [];
    const invalidBookings: CreateBookingDto[] = [];

    for (let week = 0; week < numberOfWeeks; week++) {
      for (const timeSlot of trainingTimes) {
        const { start, end, dayOfWeek } = timeSlot;
        let bookingDate = moment().day(dayOfWeek).add(week, 'weeks');

        // Ensure the booking date is in the future
        if (bookingDate.isBefore(moment(), 'day')) {
          bookingDate = moment(bookingDate).add(7, 'days');
        }

        const newBooking: CreateBookingDto = {
          member_id: memberId,
          date: bookingDate.format('YYYY-MM-DD'),
          service_class_id: serviceId,
          time: start,
          workout_id: 0,
          trainer_id: 0,
          participants: 1,
          payment_method: 1,
          note: `Đặt lịch hằng tuần thứ ${dayOfWeek} lúc ${start}`,
        };

        // Check required equipment and duplicate bookings in parallel
        const requiredEquipment = await this.getRequiredEquipment(
          newBooking.service_class_id,
          newBooking.workout_id
        );
        const checkEquipmentAvailability = await this.checkEquipmentAvailability(
          requiredEquipment,
          newBooking.date,
          newBooking.time
        );
        const checkDuplicateBookings = await this.checkDuplicateBookings(
          newBooking.date,
          newBooking.time,
          newBooking.member_id
        );

        if (checkEquipmentAvailability && !checkDuplicateBookings) {
          validBookings.push(newBooking);
        } else {
          invalidBookings.push(newBooking);
        }
      }
    }

    if (invalidBookings.length > 0) {
      throw new BadRequestException({
        message: `Các lịch sau không thể đặt: ${invalidBookings.map((b) => b.note).join(', ')}`,
      });
    }

    // Save all valid bookings to the database
    await this.bookingRepository.save(validBookings);

    return new PageResponseDto(validBookings);
  }
}
