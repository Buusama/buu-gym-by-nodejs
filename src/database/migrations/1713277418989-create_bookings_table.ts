import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
                        name: 'schedule_id',
                        type: 'int',
                    },
                    {
                        name: 'member_id',
                        type: 'int',
                    },
                    {
                        name: 'participants',
                        type: 'int',
                    },
                    {
                        name: 'note',
                        type: 'text',
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
