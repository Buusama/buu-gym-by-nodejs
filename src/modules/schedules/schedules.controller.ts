import { Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "src/interceptors/transform.interceptor";
import { SchedulesService } from "./schedules.service";
import { PublicRoute } from "src/commons/decorators/public-route.decorator";
import { GetSchedulesByServiceIdAndDayDto } from "./dto";

@ApiTags('schedules')
@UseInterceptors(TransformInterceptor)
@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) { }
    @Get('/service/:id')
    @PublicRoute()
    @ApiOkResponse({ description: 'Get schedules by service id' })
    getSchedulesByServiceIdAndDay(
        @Param('id') id: number,
        @Query() getSchedulesByServiceIdAndDayDto: GetSchedulesByServiceIdAndDayDto
    ): Promise<any> {
        return this.schedulesService.getSchedulesByServiceIdAndDay(id, getSchedulesByServiceIdAndDayDto);
    }

}