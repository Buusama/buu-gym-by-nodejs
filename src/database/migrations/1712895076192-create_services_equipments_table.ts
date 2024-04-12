import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServicesEquipmentsTable1712895076192 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'services_equipments',
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
                    },
                    {
                        name: 'equipment_id',
                        type: 'int',
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        default: 1,
                    }
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('workout_equipments');
    }


}
