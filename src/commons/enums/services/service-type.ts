import { BaseEnum } from '../base-enum';

export enum ServiceTypeValue {
  ONLINE = 1,
  GROUP = 2,
  PRIVATE = 3,
  SELF = 4,
}

export enum ServiceTypeLabel {
  ONLINE = 'Tập luyện Online',
  GROUP = 'Tập Nhóm/Lớp Offline',
  PRIVATE = 'Tập luyện riêng 1-1',
  SELF = 'Tự tập luyện',
}

export class ServiceType extends BaseEnum {
  constructor() {
    super(ServiceTypeLabel, ServiceTypeValue);
  }
}
