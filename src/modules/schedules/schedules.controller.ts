import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SchedulesService } from './schedules.service';
import { PublicRoute } from 'src/commons/decorators/public-route.decorator';
import { GetSchedulesByServiceIdAndDayDto } from './dto';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { RoleValue } from 'src/commons/enums/role-enum';
import { UserInRequest } from 'src/commons/decorators/user-in-request.decorator';
import { User } from 'src/entities/user.entity';
import { RoleGuard } from '../auth/guard/role.guard';

@ApiTags('schedules')
@UseInterceptors(TransformInterceptor)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}
  @Get('/service/:id')
  @PublicRoute()
  @ApiOkResponse({ description: 'Get schedules by service id' })
  getSchedulesByServiceIdAndDay(
    @Param('id') id: number,
    @Query() getSchedulesByServiceIdAndDayDto: GetSchedulesByServiceIdAndDayDto,
  ): Promise<any> {
    return this.schedulesService.getSchedulesByServiceIdAndDay(
      id,
      getSchedulesByServiceIdAndDayDto,
    );
  }

  @Get('/member')
  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard)
  @RequireRole(RoleValue.MEMBER)
  @ApiOkResponse({ description: 'Get schedules by member' })
  getSchedulesByMember(@UserInRequest() user: User): Promise<any> {
    return this.schedulesService.getSchedulesByMember(user);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard)
  @RequireRole(RoleValue.MEMBER, RoleValue.TRAINER, RoleValue.ADMIN)
  @ApiOkResponse({ description: 'Get schedule by id' })
  getScheduleById(
    @UserInRequest() user: User,
    @Param('id') id: number,
  ): Promise<any> {
    return this.schedulesService.getScheduleById(user, id);
  }
}
