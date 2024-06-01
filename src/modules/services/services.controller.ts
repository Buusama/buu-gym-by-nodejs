import {
  Body,
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
import { GetListServiceServiceClassesByDayDto } from './dto/get-list-services-service-classes.dto';

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

  @Get(':id/service-classes')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get service service-classes' })
  async getServiceServiceClassesByDay(
    @Param('id') id: number,
    @Query() dto: GetListServiceServiceClassesByDayDto,
  ): Promise<PageResponseDto<Service>> {
    return this.servicesService.getServiceServiceClassesByDay(id, dto);
  }
}
