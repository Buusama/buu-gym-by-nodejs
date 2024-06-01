import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEquipmentTable1716827268221
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'condition',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'serial_id',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'room_id',
            type: 'int',
          },
          {
            name: 'equipment_category_id',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipments');
  }
}
