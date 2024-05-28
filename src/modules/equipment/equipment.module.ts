import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentDetail } from 'src/entities/equipment_detail.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentDetail])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
