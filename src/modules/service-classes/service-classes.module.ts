import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceClass } from 'src/entities/service-class.entity';
import { ServiceClassesController } from './service-classes.controller';
import { ServiceClassesService } from './service-classes.service';
import { Service } from 'src/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceClass, Service])],
  controllers: [ServiceClassesController],
  providers: [ServiceClassesService],
  exports: [ServiceClassesService],
})
export class ServiceClassesModule {}
