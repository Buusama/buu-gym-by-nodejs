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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { RoleValue } from 'src/commons/enums/role-enum';
import { Workout } from 'src/entities/workout.entity';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { CreateWorkoutDto, GetListWorkoutsDto } from './dto';
import { WorkoutsService } from './workouts.service';
import { PublicRoute } from 'src/commons/decorators/public-route.decorator';

@ApiTags('workouts')
@UseInterceptors(TransformInterceptor)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}
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
}
