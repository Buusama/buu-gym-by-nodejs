import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRoomDto, GetListRoomDto } from './dto';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { RequireRole } from '../../commons/decorators/require-role.decorator';
import { RoleValue } from '../../commons/enums/role-enum';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';

@ApiTags('rooms')
@UseInterceptors(TransformInterceptor)
@UseGuards(RoleGuard)
@ApiBearerAuth('access-token')
@Controller('rooms')
@RequireRole(RoleValue.ADMIN)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOkResponse({ description: 'Create room' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List all rooms' })
  findAll(@Query() query: GetListRoomDto) {
    return this.roomsService.findAll(query);
  }

  @Get(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get room by id' })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  update(@Param('id') id: string, @Body() updateRoomDto: CreateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }

  @Get(':id/equipments')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get equipment by room id' })
  getEquipmentByRoomId(@Param('id') id: string) {
    return this.roomsService.getEquipmentsByRoomId(+id);
  }
}
