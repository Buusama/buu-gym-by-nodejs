import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDaysOffTable1718121175756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'days_off_requests',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'trainer_id',
            type: 'int',
          },
          {
            name: 'note',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'status',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('days_off_requests');
  }
}
