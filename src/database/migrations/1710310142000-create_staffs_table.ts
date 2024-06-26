import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStaffsTable1710483576925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'staffs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'salary_amount',
            type: 'decimal',
          },
          {
            name: 'start_date',
            type: 'datetime',
          },
          {
            name: 'end_date',
            type: 'datetime',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('staffs');
  }
}
