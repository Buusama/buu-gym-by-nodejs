import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { RequireRole } from '../../commons/decorators/require-role.decorator';
import { RoleValue } from '../../commons/enums/role-enum';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, GetListEquipmentDto } from './dto';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';

@ApiTags('equipments')
@UseInterceptors(TransformInterceptor)
@UseGuards(RoleGuard)
@ApiBearerAuth('access-token')
@RequireRole(RoleValue.ADMIN)
@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  @Post()
  @ApiOkResponse({ description: 'Create Equipment' })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List all Equipments' })
  findAll(@Query() query: GetListEquipmentDto) {
    return this.equipmentService.findAll(query);
  }

  @Get(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get Equipment by id' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @Patch(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: CreateEquipmentDto,
  ) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}
