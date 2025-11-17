import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreAccess1763027825153 implements MigrationInterface {
    name = 'StoreAccess1763027825153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`store_access\` (\`store_access_pkey\` int NOT NULL AUTO_INCREMENT, \`s_code\` varchar(10) NOT NULL, \`reg_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`store_access_pkey\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`store_access\``);
    }

}
