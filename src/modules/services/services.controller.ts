import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../../commons/decorators/public-route.decorator';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Service } from '../../entities/service.entity';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListServiceServiceClassesByDayDto } from './dto/get-list-services-service-classes.dto';
import { GetListServicesDto } from './dto/get-list-services.dto';
import { ServicesService } from './services.service';
import { createServiceDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../../supports/helpers';

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

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      limits: { fileSize: 20 * 1024 * 1024 /* 20MB */ },
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  @PublicRoute()
  @ApiOkResponse({ description: 'Create service' })
  async createService(
    @Body() dto: createServiceDto,
    @UploadedFile() thumbnail: Express.Multer.File,

  ) {
    return this.servicesService.createService(dto, thumbnail);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      limits: { fileSize: 20 * 1024 * 1024 /* 20MB */ },
      fileFilter: imageFileFilter,
    }),
  )
  @Put(':id')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Update service' })
  async updateService(
    @Param('id') id: number,
    @Body() dto: createServiceDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    return this.servicesService.updateService(id, dto, thumbnail);
  }

  // @Get(':id/service_classes')
  // @PublicRoute()
  // @UseFilters(EntityNotFoundErrorFilter)
  // @ApiOkResponse({ description: 'Get service service-classes' })
  // async getServiceServiceClassesByDay(
  //   @Param('id') id: number,
  //   @Query() dto: GetListServiceServiceClassesByDayDto,
  // ): Promise<PageResponseDto<Service>> {
  //   return this.servicesService.getServiceServiceClassesByDay(id, dto);
  // }

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
