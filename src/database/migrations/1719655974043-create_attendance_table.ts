import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAttendanceTable1719655974043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'attendance',
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
                        name: 'date',
                        type: 'date',
                    },
                    {
                        name: 'time_in',
                        type: 'time',
                    },
                    {
                        name: 'time_out',
                        type: 'time',
                    }
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attendance');
    }

}
