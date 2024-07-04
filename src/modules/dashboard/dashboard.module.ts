import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "../../entities/booking.entity";
import { EquipmentCategory } from "../../entities/equipment-category.entity";
import { Equipment } from "../../entities/equipment.entity";
import { Member } from "../../entities/member.entity";
import { Trainer } from "../../entities/trainer.entity";
import { Workout } from "../../entities/workout.entity";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { Room } from "../../entities/room.entity";
import { MembershipPlan } from "../../entities/membership-plan.entity";
import { MemberMembership } from "../../entities/member-membership.entity";
import { MembershipPayment } from "../../entities/membership-payment.entity";
import { BookingsModule } from "../booking/bookings.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Booking,
            Member,
            EquipmentCategory,
            Equipment,
            Trainer,
            Workout,
            Room,
            MembershipPlan,
            MemberMembership,
            MembershipPayment,
        ]),
        BookingsModule
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
    exports: [DashboardService],
})
export class DashboardModule { }
