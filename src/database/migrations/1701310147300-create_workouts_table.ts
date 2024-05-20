import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWorkoutsTable1710477210022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'workouts',
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
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'room_id',
            type: 'int',
          },
          {
            name: 'capacity',
            type: 'int',
            unsigned: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('workouts');
  }
}
