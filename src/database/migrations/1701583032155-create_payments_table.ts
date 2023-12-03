import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentsTable1701583032155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'registration_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            unsigned: true,
          },
          {
            name: 'payment_method',
            type: 'smallint',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'type',
            type: 'smallint',
            unsigned: true,
            comment: '1: registration, 2: monthly payment',
          },
          {
            name: 'status',
            type: 'smallint',
            unsigned: true,
            default: 1,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'created_user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'deleted_user_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payments');
  }
}
