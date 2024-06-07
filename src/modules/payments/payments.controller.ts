import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { RequireRole } from 'src/commons/decorators/require-role.decorator';
import { RoleValue } from 'src/commons/enums/role-enum';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@UseInterceptors(TransformInterceptor)
@UseGuards(RoleGuard)
@ApiBearerAuth('access-token')
@Controller('payments')
@RequireRole(RoleValue.ADMIN)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
}
