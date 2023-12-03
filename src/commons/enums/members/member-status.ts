import { BaseEnum } from '../base-enum';

export enum MemberStatusValue {
  BINH_THUONG = 1,
  SAP_HET_HAN = 2,
  HET_HAN = 3,
  KHOA = 4,
  CHUA_ACTIVE = 5,
}

export enum MemberStatusLabel {
  BINH_THUONG = 'Bình Thường',
  SAP_HET_HAN = 'Sắp Hết Hạn',
  HET_HAN = 'Hết Hạn',
  KHOA = 'Khóa',
  CHUA_ACTIVE = 'Chưa Active',
}

export class MemberStatus extends BaseEnum {
  constructor() {
    super(MemberStatusLabel, MemberStatusValue);
  }
}
