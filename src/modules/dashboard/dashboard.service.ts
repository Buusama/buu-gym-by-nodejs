import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../../entities/booking.entity";
import { MemberMembership } from "../../entities/member-membership.entity";
import { Member } from "../../entities/member.entity";
import { MembershipPayment } from "../../entities/membership-payment.entity";
import { MembershipPlan } from "../../entities/membership-plan.entity";
import { Room } from "../../entities/room.entity";
import { Trainer } from "../../entities/trainer.entity";
import { Workout } from "../../entities/workout.entity";
import { Repository } from "typeorm";
import { PageResponseDto } from "../pagination/dto/page-response.dto";
import { convertTimeToShift } from "../../supports/helpers";
import { BookingsService } from "../booking/bookings.service";

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
        @InjectRepository(Trainer)
        private trainerRepository: Repository<Trainer>,
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
        @InjectRepository(MembershipPlan)
        private membershipPlanRepository: Repository<MembershipPlan>,
        @InjectRepository(MemberMembership)
        private memberMembershipRepository: Repository<MemberMembership>,
        @InjectRepository(MembershipPayment)
        private membershipPaymentRepository: Repository<MembershipPayment>,

        private bookingService: BookingsService,
    ) { }

    async getDashboardData() {
        const currentDate = new Date();
        const expiringDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);

        const bookingCount = await this.bookingRepository.count();
        const memberCount = await this.memberRepository.count();
        const activeMembers = await this.memberRepository.createQueryBuilder('member')
            .where('member.end_date > :currentDate', { currentDate: currentDate.toISOString() })
            .getCount();
        const inactiveMembers = await this.memberRepository.createQueryBuilder('member')
            .where('member.end_date < :currentDate', { currentDate: currentDate.toISOString() })
            .getCount();
        const expiringMembers = await this.memberRepository.createQueryBuilder('member')
            .where('member.end_date > :currentDate', { currentDate: currentDate.toISOString() })
            .andWhere('member.end_date < :expiringDate', { expiringDate: expiringDate.toISOString() })
            .getCount();

        const roomCount = await this.roomRepository.count();
        const trainerCount = await this.trainerRepository.count();
        const workoutCount = await this.workoutRepository.count();


        const totalSales = await this.memberMembershipRepository.createQueryBuilder('member_membership')
            .select('SUM(MP.price) AS sales')
            .innerJoin(MembershipPlan, 'MP', 'member_membership.membership_plan_id = MP.id')
            .getRawOne();
        const totalRevenue = await this.membershipPaymentRepository.createQueryBuilder('membership_payment')
            .select('SUM(membership_payment.payment_amount) AS revenue')
            .getRawOne();
        const totalReceivable = totalSales.sales - totalRevenue.revenue;

        return new PageResponseDto({
            bookingCount,
            memberCount,
            activeMembers,
            inactiveMembers,
            expiringMembers,
            roomCount,
            trainerCount,
            workoutCount,
            totalSales: totalSales.sales,
            totalRevenue: totalRevenue.revenue,
            totalReceivable,
        });
    }

    // top 10 hội viên tiềm năng tính bằng số booking trong tháng hiện tại
    async getPotentialMembers() {
        const currentDate = new Date();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const firstDayISO = firstDay.toISOString().split('T')[0];
        const lastDayISO = lastDay.toISOString().split('T')[0];

        const query = await this.bookingRepository.createQueryBuilder('booking')
            .innerJoin('booking.member', 'member')
            .innerJoin('member.user', 'user')
            .select('booking.member_id AS member_id')
            .addSelect('user.name AS member_name')
            .addSelect('user.email AS member_email')
            .addSelect('user.phone AS member_phone')
            .addSelect('COUNT(booking.id) AS booking_count')
            .where('booking.date >= :firstDay', { firstDay: firstDayISO })
            .andWhere('booking.date <= :lastDay', { lastDay: lastDayISO })
            .groupBy('booking.member_id')
            .orderBy('booking_count', 'DESC')
            .limit(10)
            .getRawMany();

        return new PageResponseDto(query);
    }

    // huấn luyện viên đang rảnh rỗi ( không có booking nào thời điểm hiện tại và có ngày làm việc hôm nay)
    async getAvailableTrainers() {
        const currentDate = new Date('2024-07-03T17:45:00');
        const currentDay = currentDate.getDay();
        const currentTime = currentDate.toTimeString().split(' ')[0];
        const currentShift = convertTimeToShift(currentTime);
        // tìm tất cả booking hiện tại
        // const query = await this.bookingRepository.createQueryBuilder('booking')
        //     .select('booking')
        //     .where('booking.date = :currentDate', { currentDate: currentDate.toISOString().split('T')[0] }) // Current date formatted for SQL (YYYY-MM-DD)
        //     .andWhere('booking.start_time <= :currentTime', { currentTime })
        //     .andWhere('booking.end_time >= :currentTime', { currentTime })
        //     .getRawMany();

        const query = await this.trainerRepository.createQueryBuilder('trainer')
            .leftJoin('trainer.bookings', 'booking', 'booking.date = :currentDate AND booking.start_time <= :currentTime AND booking.end_time >= :currentTime')
            .innerJoin('trainer.staff', 'staff')
            .innerJoin('staff.user', 'user')
            .where('JSON_CONTAINS(trainer.work_schedule, :workingDay)')
            .andWhere('booking.id IS NULL')
            .select(['user.name', 'user.phone', 'user.email', 'trainer.staff_id', 'trainer.experience', 'trainer.specialty', 'trainer.rating'])
            .setParameters({
                currentDate: currentDate.toISOString().split('T')[0], // Current date formatted for SQL (YYYY-MM-DD)
                currentTime, // Current time formatted for SQL (HH:MM:SS)
                workingDay: JSON.stringify([{ day: currentDay, shift: currentShift, isSelected: true }]), // Current day of the week
            })
            .orderBy('trainer.id')
            .getRawMany();

        return new PageResponseDto(query);
    }
    // bài tập có khả năng được tập luyện yêu cầu đủ thiết bị và đủ huấn luyện viên. có thể sử dụng hàm trong bookingService để kiểm tra điều kiện thiết bị

    async getAvailableWorkouts() {
        const currentDate = new Date('2024-06-29T17:45:00');
        const currentDay = currentDate.getDay();
        const currentTime = currentDate.toTimeString().split(' ')[0]; // Current time formatted for SQL (HH:MM:SS)
        const newDate = currentDate.toISOString().split('T')[0]; // Current date formatted for SQL (YYYY-MM-DD)

        // Lấy tất cả các bài tập từ cơ sở dữ liệu
        const workouts = await this.workoutRepository.createQueryBuilder('workout').getMany();

        // Lọc các bài tập có thể phục vụ dựa trên tình trạng thiết bị
        const availableWorkouts = [];

        for (const workout of workouts) {
            const requiredEquipment = await this.bookingService.getRequiredEquipment(workout.id);
            const check = await this.bookingService.checkEquipmentAvailability(requiredEquipment, newDate, currentTime, currentTime);
            // console.log(requiredEquipment);
            // const check = true;

            if (check) {
                availableWorkouts.push(workout);
            }
        }

        return new PageResponseDto(availableWorkouts);
    }


    // thống kê doanh thu từng ngày trong tháng-năm 
    async getRevenueByMonth(month: number, year: number) {
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);

        const firstDayISO = firstDay.toISOString().split('T')[0];
        const lastDayISO = lastDay.toISOString().split('T')[0];

        const query = await this.memberMembershipRepository.createQueryBuilder('member_membership')
            .select('DAY(member_membership.start_date) AS day')
            .addSelect('SUM(MP.price) AS sales')
            .innerJoin(MembershipPlan, 'MP', 'member_membership.membership_plan_id = MP.id')
            .where('member_membership.start_date >= :firstDay', { firstDay: firstDayISO })
            .andWhere('member_membership.start_date <= :lastDay', { lastDay: lastDayISO })
            .groupBy('DAY(member_membership.start_date)')
            .orderBy('day')
            .getRawMany();

        return new PageResponseDto(query);
    }

    // thống kê doanh thu theo từng tháng trong năm
    async getRevenueByYear(year: number) {
        const firstDay = new Date(year, 0, 1);
        const lastDay = new Date(year, 11, 31);

        const firstDayISO = firstDay.toISOString().split('T')[0];
        const lastDayISO = lastDay.toISOString().split('T')[0];

        const query = await this.memberMembershipRepository.createQueryBuilder('member_membership')
            .select('MONTH(member_membership.start_date) AS month')
            .addSelect('SUM(MP.price) AS sales')
            .innerJoin(MembershipPlan, 'MP', 'member_membership.membership_plan_id = MP.id')
            .where('member_membership.start_date >= :firstDay', { firstDay: firstDayISO })
            .andWhere('member_membership.start_date <= :lastDay', { lastDay: lastDayISO })
            .groupBy('MONTH(member_membership.start_date)')
            .orderBy('month')
            .getRawMany();

        return new PageResponseDto(query);
    }

}