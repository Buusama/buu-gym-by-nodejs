import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRegistrationInfoTable1701583307483
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'registration_info',
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
            isNullable: true,
          },

          {
            name: 'class_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'package_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'trainer_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'smallint',
            unsigned: true,
            default: 1,
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
    await queryRunner.dropTable('registration_info');
  }
}
