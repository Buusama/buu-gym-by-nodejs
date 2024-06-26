import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Session } from 'src/entities/session.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [AwsModule, TypeOrmModule.forFeature([Service, Session])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule { }
