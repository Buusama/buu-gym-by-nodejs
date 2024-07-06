import { Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "../../interceptors/transform.interceptor";
import { RoleGuard } from "../auth/guard/role.guard";
import { RequireRole } from "../../commons/decorators/require-role.decorator";
import { RoleValue } from "../../commons/enums/role-enum";
import { AttendanceService } from "./attendance.service";
import { CreateAttendanceDto, FindAllAttendanceDto } from "./dto";

@ApiTags('attendance')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('attendance')
@UseGuards(RoleGuard)
@RequireRole(RoleValue.ADMIN, RoleValue.STAFF)
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Get()
    async getAttendance(@Query() dto: FindAllAttendanceDto) {
        return this.attendanceService.getAttendance(dto);
    }

    @Post()
    async createAttendance(@Query() dto: CreateAttendanceDto) {
        return this.attendanceService.createAttendance(dto);
    }

    @Delete(':id')
    async deleteAttendance(@Param('id') id: number) {
        return this.attendanceService.deleteAttendance(id);
    }

    @Get(':id')
    async getAttendanceById(@Param('id') id: number) {
        return this.attendanceService.getAttendanceById(id);
    }

    @Put(':id')
    async updateAttendance(@Param('id') id: number, @Query() dto: CreateAttendanceDto) {
        return this.attendanceService.updateAttendance(id, dto);
    }


}