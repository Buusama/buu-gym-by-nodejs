import { BaseEnum } from '../base-enum';

export enum TypeEnumValue {
  LIKE = 1,
  EQUAL = 2,
  NOT_EQUAL = 3,
  GREATER_THAN = 4,
  GREATER_THAN_OR_EQUAL = 5,
  LESS_THAN = 6,
  LESS_THAN_OR_EQUAL = 7,
}

export enum TypeEnumLabel {
  LIKE = 'like',
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
}

export class TypeEnum extends BaseEnum {
  constructor() {
    super(TypeEnumValue, TypeEnumLabel);
  }
}
