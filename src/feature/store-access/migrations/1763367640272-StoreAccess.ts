import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreAccess1763367640272 implements MigrationInterface {
    name = 'StoreAccess1763367640272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_access\` ADD \`store_key\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store_access\` ADD UNIQUE INDEX \`IDX_b8145af5217cbe0f099bbf036d\` (\`store_key\`)`);
        await queryRunner.query(`ALTER TABLE \`store_access\` ADD \`store_secret_key\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store_access\` ADD UNIQUE INDEX \`IDX_960a4ba29d615d14a2d18dc056\` (\`store_secret_key\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_access\` DROP INDEX \`IDX_960a4ba29d615d14a2d18dc056\``);
        await queryRunner.query(`ALTER TABLE \`store_access\` DROP COLUMN \`store_secret_key\``);
        await queryRunner.query(`ALTER TABLE \`store_access\` DROP INDEX \`IDX_b8145af5217cbe0f099bbf036d\``);
        await queryRunner.query(`ALTER TABLE \`store_access\` DROP COLUMN \`store_key\``);
    }

}
