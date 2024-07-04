import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ForcedSubject,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from '../../commons/enums/global-enum';
import { RoleValue } from '../../commons/enums/role-enum';
import { Member } from '../../entities/member.entity';
import { User } from '../../entities/user.entity';

// Support CASL infer subject
type UserModel = User & ForcedSubject<'User'>;
type MemberModel = Member & ForcedSubject<'Member'>;

export type AppSubjects = InferSubjects<UserModel | MemberModel> | 'all';
type AppAbility = Ability<[Action, AppSubjects]>;
const AppAbility = Ability as AbilityClass<AppAbility>;

@Injectable()
export class CaslAbilityFactory {
  defineAbilityForUser(user: User) {
    const { can, build } = new AbilityBuilder(AppAbility);

    let role: RoleValue;
    const member = user.member;
    const staff = user.staff;
    const trainer = staff ? staff.trainer : null;

    if (member) {
      role = RoleValue.MEMBER;
    } else if (trainer) {
      role = RoleValue.TRAINER;
    } else if (staff) {
      role = RoleValue.STAFF;
    } else {
      role = RoleValue.ADMIN;
    }

    if (role === RoleValue.ADMIN) {
      this.defineAdminPermissions(can);
    } else if (role === RoleValue.MEMBER) {
      this.defineUserPermissions(user, can);
    } else if (role === RoleValue.TRAINER || role === RoleValue.STAFF) {
      this.defineTrainerStaffPermissions(user, can);
    } else {
      // No permissions for other roles
    }
    return build();
  }

  private defineAdminPermissions(can: any) {
    // Admin has full manage access
    can(Action.Manage, 'all');
  }

  private defineUserPermissions(user: User, can: any) {
    // Users can read and update their own information
    const userPropertiesChangeable: string[] = ['email', 'name', 'password'];
    can(Action.Read, 'User', { id: user.id });
    can(Action.Update, 'User', userPropertiesChangeable, { id: user.id });
  }

  private defineTrainerStaffPermissions(user: User, can: any) {
    // Staff and trainer can read and update their own member's information
    can(Action.Read, 'User', { id: user.id });
    can(Action.Update, 'Member', { trainer_id: user.id });
  }
}
