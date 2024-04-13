import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBodyMeasurementsTable1710484921638
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'body_measurements',
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
            name: 'measurement_date',
            type: 'datetime',
          },
          {
            name: 'height',
            type: 'int',
          },
          {
            name: 'weight',
            type: 'decimal',
            unsigned: true,
            precision: 6,
            scale: 2,
          },
          {
            name: 'fat',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
          {
            name: 'muscle',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
          {
            name: 'bone',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
          {
            name: 'waist',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
          {
            name: 'hip',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
          {
            name: 'chest',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('body_measurements');
  }
}
