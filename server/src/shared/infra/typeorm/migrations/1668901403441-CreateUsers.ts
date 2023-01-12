import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1668901403441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "accountId",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKAccountId",
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                        columnNames: ["accountId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");

    }

}
