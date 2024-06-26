import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Booking } from 'src/entities/booking.entity';
import { EquipmentCategory } from 'src/entities/equipment-category.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { User } from 'src/entities/user.entity';
import { Workout } from 'src/entities/workout.entity';
import { converToDayOfWeek, convertTimeToShift } from 'src/supports/helpers';
import { Between, MoreThan, Repository } from 'typeorm';
import { FastApiService } from '../fastapi/fastapi.service';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { ServicesService } from '../services/services.service';
import { SessionsService } from '../sessions/sessions.service';
import {
  CreateBookingDto,
  CreateListBookingDto,
  FindAllBookingDto,
  MemberCreateBookingDto,
  MemberCreateListBookingDto,
} from './dto';

@Injectable()
export class BookingsService extends PageService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(EquipmentCategory)
    private readonly equipmentCategoryRepository: Repository<EquipmentCategory>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    private fastApiService: FastApiService,
    private servicesService: ServicesService,
    private sessionsService: SessionsService,
  ) {
    super();
  }

  private async checkEquipmentAvailability(
    requiredEquipment: EquipmentCategory[],
    date: string,
    start_time: string,
    end_time: string,
  ): Promise<boolean> {
    const equipmentIds = requiredEquipment.map((e) => e.id);

    const totalBookingEquipment = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.workout', 'workout')
      .leftJoin('workout.equipments', 'equipment_category')
      .where('booking.date = :date', { date })
      .andWhere('booking.start_time < :end_time', { end_time })
      .andWhere('booking.end_time > :start_time', { start_time })
      .andWhere('equipment_category.id IN (:...equipmentIds)', { equipmentIds })
      .select('equipment_category.id AS equipment_id')
      .addSelect('COUNT(booking.id) AS total')
      .groupBy('equipment_category.id')
      .getRawMany();

    for (const equipment of requiredEquipment) {
      const totalWorkoutBookings = totalBookingEquipment.find(
        (e) => e.equipment_id === equipment.id,
      )?.total || 0;
      console.log(totalWorkoutBookings, equipment.max_capacity, equipment.equipments.length)
      if (totalWorkoutBookings >= equipment.max_capacity * equipment.equipments.length) {
        return false;
      }
    }
    return true;
  }

  private async getRequiredEquipment(workoutId?: number): Promise<EquipmentCategory[]> {
    if (workoutId) {
      return this.equipmentCategoryRepository.find({
        where: { workouts: { id: workoutId } },
        relations: ['equipments'],
      });
    }
    return [];
  }

  private async checkDuplicateBookings(
    date: string,
    start_time: string,
    end_time: string,
    memberId: number,
  ): Promise<boolean> {
    const existingBookings = await this.bookingRepository.find({
      where: {
        date,
        member_id: memberId,
      },
    });

    return existingBookings.some(
      (booking) =>
        booking.start_time < end_time && booking.end_time > start_time,
    );
  }

  private bookingSelectFields() {
    return [
      'BookingTrainerUser.name AS bookingTrainerName',
      'BookingTrainer.id AS bookingTrainerId',
      'booking.date AS date',
      'booking.start_time AS startTime',
      'booking.end_time AS endTime',
      'booking.id AS bookingId',
      'booking.member_id AS memberId',
      'booking.participants AS participants',
      'booking.payment_method AS payment_method',
      'booking.note AS notes',
      'booking.status AS status',
      'workout.id AS workoutId',
      'workout.name AS workoutName',
      'workout.thumbnail AS workoutThumbnail',
      'workout.duration AS workoutDuration',
      'memberUser.name AS memberName',
    ];
  }

  private async getBookingDetailsById(id: number) {
    return await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.workout', 'workout')
      .leftJoin('booking.trainer', 'BookingTrainer')
      .leftJoin('BookingTrainer.staff', 'BookingTrainerStaff')
      .leftJoin('BookingTrainerStaff.user', 'BookingTrainerUser')
      .leftJoin('booking.member', 'member')
      .leftJoin('member.user', 'memberUser')
      .leftJoin('booking.service', 'service')
      .where('booking.id = :id', { id })
      .select(this.bookingSelectFields())
      .addSelect([
        'service.name AS serviceName',
        'service.price AS servicePrice',
        'service.thumbnail AS serviceThumbnail',
        'service.service_type AS serviceType',
        'service.duration AS serviceDuration',
        'service.description AS serviceDescription'
      ])
      .getRawOne();
  }

  async getBooking(user: User, id: number): Promise<PageResponseDto<any>> {
    const booking = await this.getBookingDetailsById(id);

    if (booking.memberId !== user.member.id) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    return new PageResponseDto(booking);
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

    return new PageResponseDto(bookings);
  }

  async adminGetAllBookings(
    dto: FindAllBookingDto,
  ): Promise<PageResponseDto<any>> {
    const bookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.workout', 'workout')
      .leftJoin('booking.trainer', 'BookingTrainer')
      .leftJoin('BookingTrainer.staff', 'BookingTrainerStaff')
      .leftJoin('BookingTrainerStaff.user', 'BookingTrainerUser')
      .leftJoin('booking.member', 'member')
      .leftJoin('member.user', 'memberUser')
      .select(this.bookingSelectFields())

    if (dto.date) {
      bookings.andWhere('booking.date = :date', { date: dto.date });
    }
    if (dto.start_time) {
      bookings.andWhere('booking.start_time = :start_time', {
        start_time: dto.start_time,
      });
    }

    if (dto.end_time) {
      bookings.andWhere('booking.end_time = :end_time', {
        end_time: dto.end_time,
      });
    }

    if (dto.workout_id) {
      bookings.andWhere('booking.workout_id = :workout_id', {
        workout_id: dto.workout_id,
      });
    }

    if (dto.start_date && dto.end_date) {
      bookings.andWhere('booking.date BETWEEN :start_date AND :end_date', {
        start_date: dto.start_date,
        end_date: dto.end_date,
      });
    }


    if (dto.status) {
      bookings.andWhere('booking.status = :status', { status: dto.status });
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

  async solverSchedule(startDate: string, endDate: string, extraBookings: any[]) {
    // Get all trainers
    let counter = 1;
    const allTrainers = await this.trainerRepository.find({
      select: ['id', 'staff'],
      relations: ['staff', 'staff.user']
    });
    const formattedTrainers = allTrainers.map((trainer) => ({
      id: trainer.id,
      name: trainer.staff.user.name,
    }));

    // Get all workouts
    const workouts = await this.workoutRepository.find({
      select: ['id', 'name'],
    });
    const formattedWorkouts = workouts.map((workout) => ({
      id: workout.id,
      name: workout.name,
    }));

    // Get all bookings within the specified date range and with workout_id > 0
    const bookings = await this.bookingRepository.find({
      select: ['id', 'date', 'start_time', 'end_time', 'workout_id', 'trainer_id', 'member_id'],
      where: {
        workout_id: MoreThan(0),
        date: Between(startDate, endDate),
      },
    });

    // Combine bookings from the database with extra bookings
    let combinedBookings = [...bookings];

    if (Array.isArray(extraBookings)) {
      combinedBookings = [...combinedBookings, ...extraBookings];
    }

    counter = 1;
    const formattedBookings = combinedBookings.map((booking) => {
      const dateObj = new Date(booking.date);
      return {
        id: counter++,
        ...booking,
        day: dateObj.getDay(), // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
      };
    });

    counter = 1;
    const bookeds = combinedBookings
      .map((booking) => {
        if (booking && booking.trainer_id) {
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
      select: ['id'],
      relations: ['workouts'],
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
        trainer.workouts.map((workout) => ({
          id: counter++,
          trainerId: trainer.id,
          workoutId: workout.id,
        })),
      )
      .flat();

    if (formattedBookings.length < 50) {
      return new PageResponseDto({
        status: true,
        message: 'Số lượng lịch đặt quá ít',
      });
    }
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
  }

  async saveSchedule(data: any[]) {
    try {
      data.forEach(async (element) => {
        const booking = await this.bookingRepository.findOne({
          where: { id: element.id },
        });
        booking.trainer_id = element.assignedTrainer.id;
        await this.bookingRepository.save(booking);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
    return new PageResponseDto(data);
  }

  async createListBooking(dto: CreateListBookingDto) {
    const { memberId, startDate, endDate, trainingTimes } = dto;
    const { serviceId } = dto;
    const validBookings: CreateBookingDto[] = [];
    const invalidBookings: { note: string, reason: string }[] = [];

    let currentBookingDate = moment(startDate);
    while (currentBookingDate.isSameOrBefore(moment(endDate))) {
      for (const timeSlot of trainingTimes) {
        const { dayOfWeek, start_time, end_time, workout, trainer } = timeSlot;

        let bookingDate = moment(currentBookingDate).day(dayOfWeek);

        if (bookingDate.isBefore(moment(), 'day')) {
          bookingDate = bookingDate.add(1, 'week');
        }

        if (bookingDate.isSameOrAfter(moment(startDate)) && bookingDate.isSameOrBefore(moment(endDate))) {
          const newBooking: CreateBookingDto = {
            member_id: memberId,
            service_id: serviceId,
            date: bookingDate.format('YYYY-MM-DD'),
            start_time: start_time,
            end_time: end_time,
            workout_id: workout,
            trainer_id: trainer,
            participants: 1,
            payment_method: 1,
            note: `Đặt lịch hằng tuần ${converToDayOfWeek(dayOfWeek)} lúc ${start_time}- ${end_time}`,
          };

          const [requiredEquipment, checkDuplicateBookings] = await Promise.all([
            this.getRequiredEquipment(newBooking.workout_id),
            this.checkDuplicateBookings(newBooking.date, newBooking.start_time, newBooking.end_time, newBooking.member_id),
          ]);

          const checkEquipmentAvailability = await this.checkEquipmentAvailability(
            requiredEquipment,
            newBooking.date,
            newBooking.start_time,
            newBooking.end_time,
          );

          if (checkEquipmentAvailability && !checkDuplicateBookings) {
            validBookings.push(newBooking);
          } else {
            const reason = checkDuplicateBookings ? "Lịch đặt bị trùng lặp" : "Thiết bị không khả dụng";
            const errorEntry = { note: newBooking.note, reason };
            if (!invalidBookings.find(entry => entry.note === errorEntry.note && entry.reason === errorEntry.reason)) {
              invalidBookings.push(errorEntry);
            }
          }
        }
      }

      const weekStartDate = currentBookingDate.format('YYYY-MM-DD');
      const weekEndDate = currentBookingDate.add(6, 'day').format('YYYY-MM-DD');

      // Filter extraBookings for the current week
      const weekExtraBookings = validBookings.filter((booking) => {
        return moment(booking.date).isBetween(weekStartDate, weekEndDate);
      });
      // Assign fake booking_id to extra bookings
      weekExtraBookings.forEach((booking: any, index) => {
        booking.id = - index;
      });
      // Check if trainers can be assigned for the week including valid and extra bookings
      const checkAssignedTrainer = await this.solverSchedule(weekStartDate, weekEndDate, validBookings.concat(weekExtraBookings)).then((res: any) => {
        return res.data.status;
      });

      if (!checkAssignedTrainer) {
        throw new BadRequestException({
          message: `Số lượng huấn luyện viên không đủ để phân công lịch đặt từ ${weekStartDate} đến ${weekEndDate}`,
        });
      }

      currentBookingDate = currentBookingDate.add(1, 'week');
    }

    if (invalidBookings.length > 0) {
      throw new BadRequestException({
        message: `Các lịch sau không thể đặt:`,
        details: invalidBookings,
      });
    }

    const savedBookings = await this.bookingRepository.save(validBookings);
    return new PageResponseDto(validBookings);
  }

  async memberCreateListBooking(user: User, dto: MemberCreateListBookingDto) {
    const { ...params } = dto;

    return this.createListBooking({
      ...params,
      memberId: user.member.id,
    });
  }

  async recommendTrainers(booking: number) {
    // nhiệm vụ của hàm này là lấy ra danh sách các trainer có thể phù hợp với booking
    // yêu cầu trainer phải có thể dạy workout trong booking
    // và phải có thể làm việc vào thời gian booking
    // sau đó sử dụng assignData để tính số lượng booking mà trainer đó đã nhận trong tuần

    // Lấy thông tin booking
    const bookingDetails = await this.bookingRepository.findOne({
      where: { id: booking },
      relations: ['workout'],
    });

    if (!bookingDetails) {
      throw new BadRequestException('Booking không tồn tại');
    }

    const { date, start_time, workout_id } = bookingDetails;

    // Lấy danh sách trainer có thể dạy workout
    const trainers = await this.trainerRepository.find({
      where: { workouts: { id: workout_id } },
    });

    // lọc ra các trainer có thể làm việc vào thời gian booking dựa vào trường work_schedule trong trainers
    const availableTrainers = trainers.filter((trainer) => {
      const workSchedule = trainer.work_schedule;
      const dayOfWeek = moment(date).day();
      const shift = convertTimeToShift(start_time);
      return workSchedule.some((schedule) => schedule.day === dayOfWeek && schedule.shift === shift);
    });

    return new PageResponseDto(availableTrainers);
  }
}
