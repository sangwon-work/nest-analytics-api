import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreAccess1763028147033 implements MigrationInterface {
    name = 'StoreAccess1763028147033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_access\` DROP COLUMN \`s_code\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_access\` ADD \`s_code\` varchar(10) NOT NULL`);
    }

}
