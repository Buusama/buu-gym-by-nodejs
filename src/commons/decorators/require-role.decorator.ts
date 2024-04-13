import { SetMetadata } from '@nestjs/common';
import { RoleValue } from '../enums/role-enum';

export const RequireRole = (...roles: RoleValue[]) =>
  SetMetadata('requireRoles', roles);
