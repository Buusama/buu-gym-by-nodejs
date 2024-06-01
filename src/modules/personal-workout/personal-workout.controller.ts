import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { PersonalWorkoutService } from './personal-workout.service';
import { RoleValue } from 'src/commons/enums/role-enum';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { CreatePersonalWorkoutDto } from './dto';

@ApiTags('personal-workout')
@UseInterceptors(TransformInterceptor)
@Controller('personal-workout')
@ApiBearerAuth('access-token')
@RequireRole(RoleValue.ADMIN)
export class PersonalWorkoutController {
  constructor(
    private readonly personalWorkoutService: PersonalWorkoutService,
  ) {}

  @Post()
  @ApiOkResponse({ description: 'Create personal workout' })
  create(@Body() createPersonalWorkoutDto: CreatePersonalWorkoutDto) {
    return this.personalWorkoutService.create(createPersonalWorkoutDto);
  }
}
