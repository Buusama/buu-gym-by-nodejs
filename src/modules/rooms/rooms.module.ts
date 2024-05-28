import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from 'src/entities/room.entity';
import { EquipmentDetail } from 'src/entities/equipment_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room,EquipmentDetail])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
