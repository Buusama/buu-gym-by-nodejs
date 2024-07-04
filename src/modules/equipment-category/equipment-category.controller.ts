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
import { EquipmentCategoriesService } from './equipment-category.service';
import { CreateEquipmentCategoryDto, GetListEquipmentCategoryDto } from './dto';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';

@ApiTags('equipment_categories')
@UseInterceptors(TransformInterceptor)
@UseGuards(RoleGuard)
@ApiBearerAuth('access-token')
@RequireRole(RoleValue.ADMIN)
@Controller('equipment_categories')
export class EquipmentCategoriesController {
  constructor(
    private readonly equipmentCategoriesService: EquipmentCategoriesService,
  ) {}

  @Post()
  @ApiOkResponse({ description: 'Create EquipmentCategory' })
  create(@Body() createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    return this.equipmentCategoriesService.create(createEquipmentCategoryDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List all EquipmentCategories' })
  findAll(@Query() query: GetListEquipmentCategoryDto) {
    return this.equipmentCategoriesService.findAll(query);
  }

  @Get(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get EquipmentCategories by id' })
  findOne(@Param('id') id: string) {
    return this.equipmentCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  update(
    @Param('id') id: string,
    @Body() updateEquipmentCategoryDto: CreateEquipmentCategoryDto,
  ) {
    return this.equipmentCategoriesService.update(
      +id,
      updateEquipmentCategoryDto,
    );
  }

  @Delete(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  remove(@Param('id') id: string) {
    return this.equipmentCategoriesService.remove(+id);
  }
}
