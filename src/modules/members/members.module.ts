import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { AwsModule } from '../aws/aws.module';
import { UniqueColumnValidator } from 'src/validators/unique-column.validator';
@Module({
  imports: [TypeOrmModule.forFeature([Member]), AwsModule],
  controllers: [MembersController],
  providers: [MembersService, UniqueColumnValidator],
  exports: [MembersService],
})
export class MembersModule {}
