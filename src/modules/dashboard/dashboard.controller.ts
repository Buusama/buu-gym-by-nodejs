import { Controller, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RequireRole } from "../../commons/decorators/require-role.decorator";
import { RoleValue } from "../../commons/enums/role-enum";
import { TransformInterceptor } from "../../interceptors/transform.interceptor";
import { RoleGuard } from "../auth/guard/role.guard";
import { DashboardService } from "./dashboard.service";
import { PageResponseDto } from "../pagination/dto/page-response.dto";

@ApiTags('dashboard')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('dashboard')
@RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
@UseGuards(RoleGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    async getDashboard() {
        const dashboardData = await Promise.all([
            this.dashboardService.getDashboardData(),
            this.dashboardService.getPotentialMembers(),
            this.dashboardService.getAvailableTrainers(),
            this.dashboardService.getAvailableWorkouts(),
        ]);

        return new PageResponseDto({
            data: {
                dashboard: dashboardData[0],
                member: dashboardData[1],
                trainer: dashboardData[2],
                workout: dashboardData[3],
            },
        });
    }
    @Get('/dashboard')
    async getDashboardData() {
        return this.dashboardService.getDashboardData();
    }

    @Get('/trainer')
    async getTrainerData() {
        return this.dashboardService.getAvailableTrainers();
    }

    @Get('/member')
    async getMemberData() {
        return this.dashboardService.getPotentialMembers();
    }

    @Get('/workout')
    async getWorkoutData() {
        return this.dashboardService.getAvailableWorkouts();
    }

    @Get('/revenue-monthly')
    async getRevenueByMonth(@Query('month') month: number, @Query('year') year: number){
        return this.dashboardService.getRevenueByMonth(month, year);
    }

    @Get('/revenue-yearly')
    async getRevenueByYear(@Query('year') year: number){
        return this.dashboardService.getRevenueByYear(year);
    }

}