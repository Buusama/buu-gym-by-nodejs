import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../../entities/trainer.entity';
import { AwsModule } from '../aws/aws.module';
import { UniqueColumnValidator } from '../../validators/unique-column.validator';
@Module({
  imports: [TypeOrmModule.forFeature([Trainer]), AwsModule],
  controllers: [TrainersController],
  providers: [TrainersService, UniqueColumnValidator],
  exports: [TrainersService],
})
export class TrainersModule {}
