import {
  Controller,
  Get,
  Param,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Service } from '../../entities/service.entity';
import { RoleGuard } from '../auth/guard/role.guard';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListServicesDto } from './dto/get-list-services.dto';
import { ServicesService } from './services.service';
import { PublicRoute } from 'src/commons/decorators/public-route.decorator';
import { GetListServiceSchedulesByDayDto } from './dto/get-list-services-schedule.dto';

@ApiTags('services')
@UseInterceptors(TransformInterceptor)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }
  @Get()
  @PublicRoute()
  @ApiOkResponse({ description: 'List all services' })
  getServices(
    @Query() getListServicesDto: GetListServicesDto,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getServices(getListServicesDto);
  }

  @Get(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @PublicRoute()
  @ApiOkResponse({ description: 'Get service by id' })
  async getService(@Param('id') id: number): Promise<PageResponseDto<Service>> {
    return this.servicesService.getService(id);
  }

  @Get(':id/schedules')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get service schedules' })
  async getServiceSchedulesByDay(
    @Param('id') id: number,
    @Query() dto: GetListServiceSchedulesByDayDto,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getServiceSchedulesByDay(id, dto);
  }
}
