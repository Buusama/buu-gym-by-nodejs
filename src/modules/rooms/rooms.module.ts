import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from '../../entities/room.entity';
import { Equipment } from '../../entities/equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Equipment])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
