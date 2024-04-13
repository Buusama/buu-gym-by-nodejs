import { BaseEnum } from './base-enum';

export enum RoleValue {
  ADMIN = 1,
  TRAINER = 2,
  STAFF = 3,
  MEMBER = 4,
}

export enum RoleLabel {
  ADMIN = 'Admin',
  STAFF = 'Staff',
  TRAINER = 'Trainer',
  MEMBER = 'Member',
}

export class Role extends BaseEnum {
  constructor() {
    super(RoleLabel, RoleValue);
  }
}
