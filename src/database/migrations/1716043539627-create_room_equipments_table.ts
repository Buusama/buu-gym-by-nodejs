import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoomEquipmentsTable1716043539627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'room_equipments',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'room_id',
                        type: 'int',
                    },
                    {
                        name: 'equipment_id',
                        type: 'int',
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('room_equipments');
    }

}
