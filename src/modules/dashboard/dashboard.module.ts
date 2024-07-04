import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { EquipmentCategory } from "src/entities/equipment-category.entity";
import { Equipment } from "src/entities/equipment.entity";
import { Member } from "src/entities/member.entity";
import { Trainer } from "src/entities/trainer.entity";
import { Workout } from "src/entities/workout.entity";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { Room } from "src/entities/room.entity";
import { MembershipPlan } from "src/entities/membership-plan.entity";
import { MemberMembership } from "src/entities/member-membership.entity";
import { MembershipPayment } from "src/entities/membership-payment.entity";
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
