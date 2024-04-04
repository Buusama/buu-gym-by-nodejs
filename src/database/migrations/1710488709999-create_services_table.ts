import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServicesTable1710488709999 implements MigrationInterface {
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
            isNullable: true,
          },
          {
            name: 'categories',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'saleOff',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'is_online',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'available',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'language',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'max_capacity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'bonus_description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'featured_image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gallery_images',
            type: 'json',
            isNullable: true,
          }
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services');
  }
}
