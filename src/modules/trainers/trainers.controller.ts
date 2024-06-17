import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { RoleValue } from 'src/commons/enums/role-enum';
import { Trainer } from 'src/entities/trainer.entity';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListTrainersDto } from './dto';
import { TrainersService } from './trainers.service';
import { User } from 'src/entities/user.entity';
import { UserInRequest } from 'src/commons/decorators/user-in-request.decorator';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';
import { PublicRoute } from 'src/commons/decorators/public-route.decorator';

@ApiTags('trainers')
@UseInterceptors(TransformInterceptor)
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get()
  @ApiOkResponse({ description: 'List all trainer' })
  @PublicRoute()
  getTrainers(
    @Query() getListTrainersDto: GetListTrainersDto,
  ): Promise<PageResponseDto<Trainer>> {
    return this.trainersService.getTrainers(getListTrainersDto);
  }

  // @ApiConsumes('multipart/form-data')
  // @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'avatar', maxCount: 1 },
  //       { name: 'certificate', maxCount: 1 },
  //     ],
  //     {
  //       limits: { fileSize: 20 * 1024 * 1024 /* 20MB */ },
  //       fileFilter: imageFileFilter,
  //     },
  //   ),
  // )
  // async createTrainer(
  //   @Body() body: CreateTrainerDto,
  //   @UploadedFiles()
  //   files: {
  //     avatar?: Express.Multer.File;
  //     certificate?: Express.Multer.File;
  //   },
  // ) {
  //   return this.trainersService.createTrainer(body, files);
  // }
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'avatar', maxCount: 1 },
  //       { name: 'certificate', maxCount: 1 },
  //     ],
  //     {
  //       limits: { fileSize: 20 * 1024 * 1024 /* 20MB */ },
  //       fileFilter: imageFileFilter,
  //     },
  //   ),
  // )
  // @Put(':id')
  // @UseFilters(EntityNotFoundErrorFilter)
  // async update(
  //   @Param('id') trainerID: string,
  //   @Body() dto: UpdateTrainerDto,
  //   @UploadedFiles()
  //   files: {
  //     avatar?: Express.Multer.File;
  //     certificate?: Express.Multer.File;
  //   },
  //   @Req() req: any,
  // ) {
  //   console.log('trainer_id', trainerID);
  //   return this.trainersService.updateTrainer(Number(trainerID), dto, files);
  // }
  @Get(':id')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  async getTrainer(@Param('id') trainer_id: string) {
    return this.trainersService.getTrainer(Number(trainer_id));
  }
  // @Delete(':id')
  // @UseFilters(EntityNotFoundErrorFilter)
  // async destroyTrainer(@Param('id') trainer_id: string) {
  //   return this.trainersService.destroyTrainer(Number(trainer_id));
  // }

  @Get(':id/available-workouts')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  async getAvailableWorkouts(@Param('id') trainer_id: string) {
    return this.trainersService.getAvailableWorkouts(Number(trainer_id));
  }

  @Get(':id/work-schedules')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  async getWorkSchedules(@Param('id') trainer_id: string) {
    return this.trainersService.getWorkSchedules(Number(trainer_id));
  }

  @Patch(':id/work-schedules')
  @PublicRoute()
  @UseFilters(EntityNotFoundErrorFilter)
  async updateWorkSchedules(
    @Param('id') trainer_id: string,
    @Body() body: { day: number; shift: number; isSelected: boolean }[],
  ) {
    return this.trainersService.updateWorkSchedules(Number(trainer_id), body);
  }
}
