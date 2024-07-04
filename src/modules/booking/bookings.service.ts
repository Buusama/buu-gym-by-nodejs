import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Booking } from '../../entities/booking.entity';
import { EquipmentCategory } from '../../entities/equipment-category.entity';
import { Equipment } from '../../entities/equipment.entity';
import { Trainer } from '../../entities/trainer.entity';
import { User } from '../../entities/user.entity';
import { Workout } from '../../entities/workout.entity';
import { converToDayOfWeek, convertTimeToShift } from '../../supports/helpers';
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

  async checkEquipmentAvailability(
    requiredEquipment: EquipmentCategory[],
    date: string,
    start_time: string,
    end_time: string,
  ): Promise<boolean> {
    const equipmentIds = requiredEquipment.map((e) => e.id);

    //in ra các booking trong thời điểm đó
    // const booking = await this.bookingRepository.createQueryBuilder('booking')
    //   .where('booking.date = :date', { date })
    //   .andWhere('booking.start_time <= :end_time', { end_time })
    //   .andWhere('booking.end_time >= :start_time', { start_time })
    //   .getRawMany();

    // console.log("booking", booking);


    let queryBuilder = await this.equipmentCategoryRepository
      .createQueryBuilder('equipmentCategory')
      .innerJoin('workout_equipments', 'we', 'we.equipment_id = equipmentCategory.id')
      .innerJoin('workouts', 'w', 'w.id = we.workout_id')
      .innerJoin('bookings', 'b', 'b.workout_id = w.id')
      .where('b.date = :date', { date })
      .andWhere('b.start_time <= :end_time', { end_time })
      .andWhere('b.end_time >= :start_time', { start_time })
      .groupBy('equipmentCategory.id')
      .addSelect('equipmentCategory.id', 'equipment_id')
      .addSelect('COUNT(b.id)', 'total');

    if (equipmentIds.length > 0) {
      queryBuilder = queryBuilder.andWhere('equipmentCategory.id IN (:...equipmentIds)', {
        equipmentIds,
      });
    }

    const totalBookingEquipment = await queryBuilder.getRawMany();

    // console.log("totalBookingEquipment", totalBookingEquipment);

    for (const equipment of requiredEquipment) {
      // console.log("equipmentId", equipment.id);
      const total = totalBookingEquipment.find((e) => e.equipment_id === equipment.id)?.total || 0;
      // console.log("totalBooking", total);
      const availableEquipment = equipment.equipments.length * equipment.max_capacity - total;
      // console.log("availableEquipment", availableEquipment);
      if (availableEquipment <= 0) {
        return false;
      }

    }

    return true;
  }



  async getRequiredEquipment(workoutId?: number): Promise<EquipmentCategory[]> {
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

    console.log("combinedBookings", combinedBookings);
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

    if (formattedBookings.length < 50 && formattedTrainers.length > 0) {
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
    const { memberId, startDate, endDate, trainingTimes, serviceId } = dto;
    const validBookings: CreateBookingDto[] = [];
    const invalidBookings: { note: string, reason: string }[] = [];
    let temporaryIdCounter = 1000000;

    let currentBookingDate = moment(startDate);
    while (currentBookingDate.isSameOrBefore(moment(endDate))) {
      await this.processTrainingTimes(currentBookingDate, trainingTimes, startDate, endDate, validBookings, invalidBookings, memberId, serviceId);

      const weekStartDate = currentBookingDate.format('YYYY-MM-DD');
      const weekEndDate = moment(currentBookingDate).add(6, 'day').format('YYYY-MM-DD');

      const weekExtraBookings = this.filterExtraBookingsForWeek(validBookings, weekStartDate, weekEndDate, temporaryIdCounter);
      temporaryIdCounter += weekExtraBookings.length;

      await this.checkAssignedTrainers(weekStartDate, weekEndDate, validBookings, weekExtraBookings);

      currentBookingDate = currentBookingDate.add(1, 'week');
    }

    if (invalidBookings.length > 0) {
      throw new BadRequestException({
        message: `Các lịch sau không thể đặt:`,
        details: invalidBookings,
      });
    }

    validBookings.forEach((booking: any) => delete booking.id);

    const savedBookings = await this.bookingRepository.save(validBookings);
    return new PageResponseDto(savedBookings);
  }

  private async processTrainingTimes(
    currentBookingDate: moment.Moment,
    trainingTimes: any[],
    startDate: string,
    endDate: string,
    validBookings: CreateBookingDto[],
    invalidBookings: { note: string, reason: string }[],
    memberId: number,
    serviceId: number
  ) {
    for (const timeSlot of trainingTimes) {
      const bookingDate = this.getBookingDate(currentBookingDate, timeSlot.dayOfWeek);

      if (bookingDate.isSameOrAfter(moment(startDate)) && bookingDate.isSameOrBefore(moment(endDate))) {
        const newBooking = this.createBooking(memberId, serviceId, bookingDate, timeSlot);

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
          this.addInvalidBooking(newBooking, checkDuplicateBookings, invalidBookings);
        }
      }
    }
  }

  private getBookingDate(currentBookingDate: moment.Moment, dayOfWeek: number) {
    let bookingDate = moment(currentBookingDate).day(dayOfWeek);
    if (bookingDate.isBefore(moment(), 'day')) {
      bookingDate = bookingDate.add(1, 'week');
    }
    return bookingDate;
  }

  private createBooking(memberId: number, serviceId: number, bookingDate: moment.Moment, timeSlot: any) {
    const { start_time, end_time, workout, trainer, dayOfWeek } = timeSlot;
    return {
      member_id: memberId,
      service_id: serviceId,
      date: bookingDate.format('YYYY-MM-DD'),
      start_time,
      end_time,
      workout_id: workout,
      trainer_id: trainer,
      participants: 1,
      payment_method: 1,
      note: `Đặt lịch hằng tuần ${converToDayOfWeek(dayOfWeek)} lúc ${start_time}- ${end_time}`,
    };
  }

  private addInvalidBooking(newBooking: CreateBookingDto, checkDuplicateBookings: boolean, invalidBookings: { note: string, reason: string }[]) {
    const reason = checkDuplicateBookings ? "Lịch đặt bị trùng lặp" : "Thiết bị không khả dụng";
    const errorEntry = { note: newBooking.note, reason };
    if (!invalidBookings.find(entry => entry.note === errorEntry.note && entry.reason === errorEntry.reason)) {
      invalidBookings.push(errorEntry);
    }
  }

  private filterExtraBookingsForWeek(validBookings: CreateBookingDto[], weekStartDate: string, weekEndDate: string, temporaryIdCounter: number) {
    const extraBookings = validBookings
      .filter(booking => moment(booking.date).isBetween(weekStartDate, weekEndDate, null, '[]'))
      .map((booking: any) => {
        booking.id = ++temporaryIdCounter;
        return booking;
      });
    return extraBookings;
  }

  private async checkAssignedTrainers(weekStartDate: string, weekEndDate: string, validBookings: CreateBookingDto[], weekExtraBookings: CreateBookingDto[]) {
    const checkAssignedTrainer = await this.solverSchedule(weekStartDate, weekEndDate, validBookings.concat(weekExtraBookings)).then((res: any) => res.data.status);
    if (!checkAssignedTrainer) {
      throw new BadRequestException({
        message: `Số lượng huấn luyện viên không đủ để phân công lịch đặt từ ${weekStartDate} đến ${weekEndDate}`,
      });
    }
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

  async deleteBooking(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    await this.bookingRepository.remove(booking);
    return new PageResponseDto(booking);
  }

  async memberCancelBooking(user: User, id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });

    if (booking.member_id !== user.member.id) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    await this.bookingRepository.remove(booking);
    return new PageResponseDto(booking);
  }

  async confirmBooking(user: User, id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });

    if (booking.member_id !== user.member.id || user.staff.trainer.id !== booking.trainer_id) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    booking.status = 1;
    await this.bookingRepository.save(booking);
    return new PageResponseDto(booking);
  }
}
