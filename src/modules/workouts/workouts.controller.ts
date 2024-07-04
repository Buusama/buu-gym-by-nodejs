import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../../commons/decorators/public-route.decorator';
import { Workout } from '../../entities/workout.entity';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { CreateWorkoutDto, GetListWorkoutsDto } from './dto';
import { WorkoutsService } from './workouts.service';

@ApiTags('workouts')
@UseInterceptors(TransformInterceptor)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }
  @Get()
  @PublicRoute()
  @ApiOkResponse({ description: 'List all workout' })
  getWorkouts(
    @Query() getListWorkoutsDto: GetListWorkoutsDto,
  ): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.getWorkouts(getListWorkoutsDto);
  }

  @Post()
  @ApiOkResponse({ description: 'Create workout' })
  createWorkout(
    @Body() createWorkoutDto: CreateWorkoutDto,
  ): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.createWorkout(createWorkoutDto);
  }

  @Get(':id')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get workout by id' })
  async getWorkout(@Param('id') id: string): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.getWorkout(+id);
  }

  @Put(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Update workout by id' })
  async updateWorkout(
    @Param('id') id: string,
    @Body() updateWorkoutDto: CreateWorkoutDto,
  ): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.updateWorkout(+id, updateWorkoutDto);
  }

  @Delete(':id')
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Delete workout by id' })
  async deleteWorkout(
    @Param('id') id: string,
  ): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.deleteWorkout(+id);
  }

  @Get(':id/equipments')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Get workout equipments' })
  async getWorkoutEquipments(
    @Param('id') id: string,
  ): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.getWorkoutEquipments(+id);
  }

  @Post(':id/equipments')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Add workout equipments' })
  async addWorkoutEquipments(
    @Param('id') id: string,
    @Body('equipmentId') equipmentId: number,
  ): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.addWorkoutEquipments(+id, equipmentId);
  }

  @Delete(':id/equipments/:equipmentId')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  @ApiOkResponse({ description: 'Delete workout equipments' })
  async deleteWorkoutEquipments(
    @Param('id') id: string,
    @Param('equipmentId') equipmentId: string,
  ): Promise<PageResponseDto<Workout>> {
    return this.workoutsService.deleteWorkoutEquipments(+id, +equipmentId);
  }


}
