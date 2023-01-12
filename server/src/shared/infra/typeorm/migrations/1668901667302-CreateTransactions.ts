import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1668901667302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "debited_account_id",
                        type: "uuid",
                    },
                    {
                        name: "credited_account_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKAccountIdDebited",
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                        columnNames: ["debited_account_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKAccountIdCredited",
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                        columnNames: ["credited_account_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");

    }

}
