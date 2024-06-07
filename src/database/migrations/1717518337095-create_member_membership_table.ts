import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMemberMembership1717518337095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'member_membership',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'member_id',
            type: 'int',
          },
          {
            name: 'membership_plan_id',
            type: 'int',
          },
          {
            name: 'start_date',
            type: 'datetime',
          },
          {
            name: 'note',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('member_membership');
  }
}
