import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTrainersTable1701581915035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trainers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'staff_id',
            type: 'int',
          },
          {
            name: 'experience',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'specialty',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'rating',
            type: 'decimal',
            precision: 2,
            scale: 1,
            default: 0,
            isNullable: true,
          },
          {
            name: 'work_schedule',
            type: 'json',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trainers');
  }
}
