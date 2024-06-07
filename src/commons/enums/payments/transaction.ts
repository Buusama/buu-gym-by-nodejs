import { BaseEnum } from '../base-enum';

export enum TransactionValue {
  MEMBERSHIP = 1,
  SALARY = 2,
  PRODUCT = 3,
  MAINTENANCE = 4,
}

export enum TransactionLabel {
  MEMBERSHIP = 'Membership',
  SALARY = 'Salary',
  PRODUCT = 'Product',
  MAINTENANCE = 'Maintenance',
}

export class Transaction extends BaseEnum {
  constructor() {
    super(TransactionLabel, TransactionValue);
  }
}
