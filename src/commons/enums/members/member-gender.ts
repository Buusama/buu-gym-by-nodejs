import { BaseEnum } from '../base-enum';

export enum MemberGenderValue {
  NAM = 1,
  NU = 2,
  KHAC = 3,
}

export enum MemberGenderLabel {
  NAM = 'Nam',
  NU = 'Nữ',
  KHAC = 'Khác',
}

export class MemberGender extends BaseEnum {
  constructor() {
    super(MemberGenderLabel, MemberGenderValue);
  }
}
