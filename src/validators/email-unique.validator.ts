import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';

@ValidatorConstraint({ name: 'emailUnique', async: true })
@Injectable()
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(value: string): Promise<boolean> {
    return this.usersService.getUserByEmail(value).then((user) => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage() {
    return 'email already exist';
  }
}
