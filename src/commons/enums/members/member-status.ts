import { BaseEnum } from '../base-enum';

export enum MemberStatusValue {
  ACTIVE = 1,
  INACTIVE = 2,
  EXPIRING = 3,
}
export enum MemberStatusLabel {
  ACTIVE = 'Hoạt động',
  INACTIVE = 'Đã ngưng',
  EXPIRING = 'Sắp hết hạn',
}

export class MemberStatus extends BaseEnum {
  constructor() {
    super(MemberStatusLabel, MemberStatusValue);
  }
}
