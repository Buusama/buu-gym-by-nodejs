import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ServicesTable1713015821979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
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
            name: 'price',
            type: 'int',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'max_participants',
            type: 'int',
            default: 1,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'service_type',
            type: 'int',
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services');
  }
}
