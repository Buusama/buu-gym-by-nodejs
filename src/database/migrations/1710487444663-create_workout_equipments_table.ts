import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWorkoutEquipmentsTable1710487444663
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'workout_equipments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'workout_id',
            type: 'int',
          },
          {
            name: 'equipment_id',
            type: 'int',
          },
          {
            name: 'quantity',
            type: 'int',
            default: 1,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('workout_equipments');
  }
}
