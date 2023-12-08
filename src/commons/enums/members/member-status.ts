import { BaseEnum } from '../base-enum';

export enum MemberStatusValue {
  ACTIVE = 1,
  INACTIVE = 2,
  DORMANT = 3,
  FREEZE = 4,
  UNPAID = 5,
}

export enum MemberStatusLabel {
  ACTIVE = 'Kích hoạt',
  INACTIVE = 'Bị khóa',
  DORMANT = 'Ngưng hoạt động',
  FREEZE = 'Đóng băng',
  UNPAID = 'Chưa thanh toán',
}

export class MemberStatus extends BaseEnum {
  constructor() {
    super(MemberStatusLabel, MemberStatusValue);
  }
}
