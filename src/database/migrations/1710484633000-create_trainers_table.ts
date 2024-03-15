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
            name: 'certificate',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'specialization',
            type: 'varchar',
            length: '50',
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
