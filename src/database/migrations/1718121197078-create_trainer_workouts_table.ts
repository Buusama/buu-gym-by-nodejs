import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAvailableWorkoutsTable1718121197078
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trainer_workouts',
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
            name: 'trainer_id',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trainer_workouts');
  }
}
