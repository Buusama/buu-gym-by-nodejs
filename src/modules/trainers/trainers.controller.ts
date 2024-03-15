import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Trainer } from 'src/entities/trainer.entity';
import { EntityNotFoundErrorFilter } from 'src/exception_filters/entity-not-found-error.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { imageFileFilter } from 'src/supports/helpers';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { CreateTrainerDto, GetListTrainersDto, UpdateTrainerDto } from './dto';
import { TrainersService } from './trainers.service';

@ApiTags('trainers')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('trainers')
export class TrainersController {
  // constructor(private readonly trainersService: TrainersService) {}

  // @Get()
  // @ApiOkResponse({ description: 'List all trainer' })
  // getTrainers(
  //   @Query() getListTrainersDto: GetListTrainersDto,
  // ): Promise<PageResponseDto<Trainer>> {
  //   return this.trainersService.getTrainers(getListTrainersDto);
  // }

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

  // @Get(':id')
  // @UseFilters(EntityNotFoundErrorFilter)
  // async getTrainer(@Param('id') trainer_id: string) {
  //   return this.trainersService.getTrainer(Number(trainer_id));
  // }

  // @Delete(':id')
  // @UseFilters(EntityNotFoundErrorFilter)
  // async destroyTrainer(@Param('id') trainer_id: string) {
  //   return this.trainersService.destroyTrainer(Number(trainer_id));
  // }
}
