import { BaseEnum } from '../base-enum';

export enum DaysOffRequestStatusValue {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}
export enum DaysOffRequestStatusLabel {
  PENDING = 'Đang chờ duyệt',
  APPROVED = 'Đã duyệt',
  REJECTED = 'Đã từ chối',
}

export class DaysOffRequestStatus extends BaseEnum {
  constructor() {
    super(DaysOffRequestStatusLabel, DaysOffRequestStatusValue);
  }
}
