import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysOffRequest } from '../../entities/days-off-requests.entity';
import { DaysOffRequestController } from './days_off_requests.controller';
import { DaysOffRequestService } from './days_off_requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([DaysOffRequest])],
  controllers: [DaysOffRequestController],
  providers: [DaysOffRequestService],
  exports: [DaysOffRequestService],
})
export class DaysOffRequestModule {}
