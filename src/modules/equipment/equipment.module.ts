import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '../../entities/equipment.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { EquipmentCategory } from '../../entities/equipment-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentCategory])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
