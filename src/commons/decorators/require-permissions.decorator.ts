import { Action } from '../enums/global-enum';
import { SetMetadata } from '@nestjs/common';
import { AppSubjects } from '../../modules/casl/casl-ability.factory';

export type Permission = {
  action: Action;
  subject: AppSubjects;
  field?: string;
};

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata('requirePermissions', permissions);
