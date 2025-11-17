import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreAccess1763368134866 implements MigrationInterface {
    name = 'StoreAccess1763368134866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_access\` ADD \`store_name\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_access\` DROP COLUMN \`store_name\``);
    }

}
