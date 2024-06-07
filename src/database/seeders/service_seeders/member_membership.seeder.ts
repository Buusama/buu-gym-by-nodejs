import { faker } from '@faker-js/faker';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Member } from '../../../entities/member.entity';
import { MemberMembership } from '../../../entities/member-membership.entity';

export default class MemberMembershipSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const members = await dataSource.getRepository(Member).find();
    const memberMembershipData = [];

    for (const member of members) {
      const memberships = this.createMembershipsForMember(member);
      memberMembershipData.push(
        ...memberships.map(({ membership }) => membership),
      );

      // Update member with the latest membership
      const { membership } = memberships[memberships.length - 1];
      member.end_date = this.calculateEndDate(
        membership.start_date,
        membership.membership_plan_id,
      );
      member.membership_plan_id = membership.membership_plan_id;

      await dataSource.getRepository(Member).save(member);
    }
    try {
      await dataSource
        .createEntityManager()
        .save(MemberMembership, memberMembershipData);
      console.log('MemberMembership seeding successful!');
    } catch (error) {
      console.error(
        'Error occurred while seeding member membership:',
        error.message,
      );
    }
  }

  private createMembershipsForMember(member: Member) {
    const memberships = [];
    const membershipCount = faker.number.int({ min: 1, max: 2 });

    for (let i = 0; i < membershipCount; i++) {
      const membership = this.createMemberMembershipData(member);
      memberships.push({ membership });
    }

    return memberships;
  }

  private createMemberMembershipData(member: Member) {
    const membership_plan_id = faker.number.int({ min: 1, max: 4 });
    const start_date = faker.date.between({
      from: member.start_date,
      to: new Date(),
    });
    return {
      member_id: member.id,
      membership_plan_id,
      start_date,
      note: faker.lorem.sentence(),
    };
  }

  private calculateEndDate(startDate: Date, membership_plan_id: number): Date {
    const endDate = new Date(startDate);
    const monthsToAdd = this.getMonthsToAddForPlan(membership_plan_id);
    endDate.setMonth(endDate.getMonth() + monthsToAdd);
    return endDate;
  }

  private getMonthsToAddForPlan(planId: number): number {
    switch (planId) {
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 6;
      case 4:
        return 12;
      default:
        return 0;
    }
  }
}
