import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentCategory } from '../../entities/equipment-category.entity';
import { EquipmentCategoriesController } from './equipment-category.controller';
import { EquipmentCategoriesService } from './equipment-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentCategory])],
  controllers: [EquipmentCategoriesController],
  providers: [EquipmentCategoriesService],
})
export class EquipmentCategoryModule {}
