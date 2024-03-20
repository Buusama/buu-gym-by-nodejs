import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { AwsModule } from '../aws/aws.module';
import { UniqueColumnValidator } from 'src/validators/unique-column.validator';
import { User } from '../../entities/user.entity';
import { Package } from '../../entities/package.entity';
import { Trainer } from '../../entities/trainer.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Member, User, Package, Trainer]),
    AwsModule,
  ],
  controllers: [MembersController],
  providers: [MembersService, UniqueColumnValidator],
  exports: [MembersService],
})
export class MembersModule {}
