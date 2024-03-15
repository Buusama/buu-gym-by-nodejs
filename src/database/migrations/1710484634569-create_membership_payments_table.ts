import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMembershipPaymentsTable1710484634569
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'membership_payments',
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
            name: 'transaction_id',
            type: 'int',
          },
          {
            name: 'payment_date',
            type: 'datetime',
          },
          {
            name: 'payment_amount',
            type: 'decimal',
          },
          {
            name: 'payment_type',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('membership_payments');
  }
}
