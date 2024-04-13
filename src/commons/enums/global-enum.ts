export enum GlobalEnum {
  DATE_FROM = ' 00:00:00',
  DATE_TO = ' 23:59:59',
  PAGE_DEFAULT = 0,
  PAGE_LIMIT = 10,
}

export interface RoleInterface {
  Admin: 'Admin';
  Staff: 'Staff';
  Trainer: 'Trainer';
  Member: 'Member';
}

export type Role = keyof RoleInterface;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
