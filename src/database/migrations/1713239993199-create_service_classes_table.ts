import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServiceClassesTable1713239993199
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_classes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'trainer_id',
            type: 'int',
          },
          {
            name: 'service_id',
            type: 'int',
          },
          {
            name: 'repeat_days',
            type: 'varchar',
          },
          {
            name: 'time',
            type: 'time',
          },
          {
            name: 'start_date',
            type: 'varchar',
          },
          {
            name: 'end_date',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_classes');
  }
}
