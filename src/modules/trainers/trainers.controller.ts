import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../../commons/decorators/public-route.decorator';
import { Trainer } from '../../entities/trainer.entity';
import { EntityNotFoundErrorFilter } from '../../exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { GetListTrainersDto } from './dto';
import { TrainersService } from './trainers.service';

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
