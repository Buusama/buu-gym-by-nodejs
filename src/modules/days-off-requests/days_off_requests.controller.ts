import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../../commons/decorators/public-route.decorator';
import { DaysOffRequest } from '../../entities/days-off-requests.entity';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { DaysOffRequestService } from './days_off_requests.service';
import { CreateDaysOffRequestDto, GetListDaysOffRequestDto } from './dto';

@ApiTags('days-off-requests')
@UseInterceptors(TransformInterceptor)
@Controller('days-off-requests')
@PublicRoute()
export class DaysOffRequestController {
  constructor(private readonly daysOffService: DaysOffRequestService) {}
  @Get()
  @ApiOkResponse({ description: 'List all days off' })
  getListDaysOffRequest(
    @Query() getListDaysOffRequestDto: GetListDaysOffRequestDto,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffService.getListDaysOffRequest(getListDaysOffRequestDto);
  }

  @Post()
  @ApiOkResponse({ description: 'Create days off' })
  createDaysOffRequest(
    @Body() createDaysOffRequestDto: CreateDaysOffRequestDto,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffService.createDaysOffRequest(createDaysOffRequestDto);
  }

  @Get(':id')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get days off by id' })
  async getDaysOffRequest(
    @Param('id') id: string,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffService.getDaysOffRequest(+id);
  }

  @Put(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Update days off by id' })
  async updateDaysOffRequest(
    @Param('id') id: string,
    @Body() updateDaysOffRequestDto: CreateDaysOffRequestDto,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffService.updateDaysOffRequest(
      +id,
      updateDaysOffRequestDto,
    );
  }

  @Delete(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Delete days off by id' })
  async deleteDaysOffRequest(
    @Param('id') id: string,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffService.deleteDaysOffRequest(+id);
  }

  @Patch(':id/approve')
  @ApiOkResponse({ description: 'Approve days off by id' })
  async approveDaysOffRequest(
    @Param('id') id: string,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffService.approveDaysOffRequest(+id);
  }

  @Patch(':id/reject')
  @ApiOkResponse({ description: 'Reject days off by id' })
  async rejectDaysOffRequest(
    @Param('id') id: string,
  ): Promise<PageResponseDto<DaysOffRequest>> {
    return this.daysOffService.rejectDaysOffRequest(+id);
  }
}
