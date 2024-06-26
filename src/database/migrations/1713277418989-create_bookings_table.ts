import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBookingsTable1713277418989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'service_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'trainer_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'member_id',
            type: 'int',
          },
          {
            name: 'workout_id',
            type: 'int',
          },
          {
            name: 'participants',
            type: 'int',
          },
          {
            name: 'payment_method',
            type: 'int',
          },
          {
            name: 'note',
            type: 'text',
          },
          {
            name: 'date',
            type: 'varchar',
          },
          {
            name: 'start_time',
            type: 'time',
          },
          {
            name: 'end_time',
            type: 'time',
          },
          {
            name: 'status',
            type: 'int',
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
    await queryRunner.dropTable('bookings');
  }
}
