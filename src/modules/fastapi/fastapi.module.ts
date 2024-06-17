import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FastApiService } from './fastapi.service';

@Module({
  imports: [HttpModule],
  providers: [FastApiService],
  exports: [FastApiService],
})
export class FastApiModule {}
