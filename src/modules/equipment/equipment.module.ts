import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from 'src/entities/equipment.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { EquipmentCategory } from 'src/entities/equipment-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment,EquipmentCategory])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule { }
