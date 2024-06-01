import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ServiceClassesService } from './service-classes.service';
import { PublicRoute } from 'src/commons/decorators/public-route.decorator';
import { GetServiceClassesByServiceIdAndDayDto } from './dto';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { RoleValue } from 'src/commons/enums/role-enum';
import { UserInRequest } from 'src/commons/decorators/user-in-request.decorator';
import { User } from 'src/entities/user.entity';
import { RoleGuard } from '../auth/guard/role.guard';

@ApiTags('service-classes')
@UseInterceptors(TransformInterceptor)
@Controller('service-classes')
export class ServiceClassesController {
  constructor(private readonly serviceClassesService: ServiceClassesService) {}
  @Get('/service/:id')
  @PublicRoute()
  @ApiOkResponse({ description: 'Get service-classes by service id' })
  getServiceClassesByServiceIdAndDay(
    @Param('id') id: number,
    @Query()
    getServiceClassesByServiceIdAndDayDto: GetServiceClassesByServiceIdAndDayDto,
  ): Promise<any> {
    return this.serviceClassesService.getServiceClassesByServiceIdAndDay(
      id,
      getServiceClassesByServiceIdAndDayDto,
    );
  }

  @Get('/member')
  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard)
  @RequireRole(RoleValue.MEMBER)
  @ApiOkResponse({ description: 'Get service-classes by member' })
  getServiceClassesByMember(@UserInRequest() user: User): Promise<any> {
    return this.serviceClassesService.getServiceClassesByMember(user);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard)
  @RequireRole(RoleValue.MEMBER, RoleValue.TRAINER, RoleValue.ADMIN)
  @ApiOkResponse({ description: 'Get service class by id' })
  getServiceClassById(
    @UserInRequest() user: User,
    @Param('id') id: number,
  ): Promise<any> {
    return this.serviceClassesService.getServiceClassById(user, id);
  }
}
