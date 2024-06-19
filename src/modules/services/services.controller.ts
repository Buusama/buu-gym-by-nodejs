import {
  Controller,
  Get,
  Param,
  Query,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from 'src/commons/decorators/public-route.decorator';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Service } from '../../entities/service.entity';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListServiceServiceClassesByDayDto } from './dto/get-list-services-service-classes.dto';
import { GetListServicesDto } from './dto/get-list-services.dto';
import { ServicesService } from './services.service';

@ApiTags('services')
@UseInterceptors(TransformInterceptor)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Get()
  @PublicRoute()
  @ApiOkResponse({ description: 'List all services' })
  getServices(
    @Query() getListServicesDto: GetListServicesDto,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getServices(getListServicesDto);
  }

  @Get('top')
  @PublicRoute()
  @ApiOkResponse({ description: 'Get top services' })
  async getTop10Services(
    @Query('limit') limit: number,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getTopServices(limit);
  }

  @Get(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @PublicRoute()
  @ApiOkResponse({ description: 'Get service by id' })
  async getService(@Param('id') id: number): Promise<PageResponseDto<Service>> {
    return this.servicesService.getService(id);
  }

  @Get(':id/service_classes')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get service service-classes' })
  async getServiceServiceClassesByDay(
    @Param('id') id: number,
    @Query() dto: GetListServiceServiceClassesByDayDto,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getServiceServiceClassesByDay(id, dto);
  }

  @Get(':id/sessions')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get service sessions' })
  async getServiceSessions(
    @Param('id') id: number,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getServiceSessions(id);
  }

  @Get(':id/sessions/:sessionId/workouts')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get service session workouts' })
  async getServiceSessionWorkouts(
    @Param('id') id: number,
    @Param('sessionId') sessionId: number,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getServiceSessionWorkouts(id, sessionId);
  }
}
