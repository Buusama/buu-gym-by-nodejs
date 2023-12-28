import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePackagesTable1701310147249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'packages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'type',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'usage_type',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'usage_limit',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'free_service',
            type: 'json',
            isNullable: true,
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
            name: 'commission_for_sellers',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'referral_commission',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'employee_referral_commission',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'commission_status',
            type: 'smallint',
            unsigned: true,
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
    await queryRunner.dropTable('packages');
  }
}
