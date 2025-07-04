import { MigrationInterface, QueryRunner } from "typeorm";

export class SOCKETLOGGINGNOTIFICATION1751595499186 implements MigrationInterface {
    name = 'SOCKETLOGGINGNOTIFICATION1751595499186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NOT NULL, \`title\` varchar(200) NOT NULL, \`message\` text NOT NULL, \`type\` enum ('info', 'success', 'warning', 'error') NOT NULL DEFAULT 'info', \`is_read\` tinyint NOT NULL DEFAULT 0, \`action_url\` varchar(500) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_status\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NOT NULL, \`status\` enum ('online', 'offline', 'away') NOT NULL DEFAULT 'offline', \`last_seen\` timestamp NULL, \`socket_id\` varchar(100) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_9bab6c49e02f517fd2efd6c1a9\` (\`user_id\`), UNIQUE INDEX \`REL_9bab6c49e02f517fd2efd6c1a9\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`audit_logs\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NULL, \`action\` enum ('create', 'update', 'delete', 'login', 'logout') NOT NULL, \`table_name\` varchar(100) NOT NULL, \`record_id\` varchar(100) NULL, \`old_values\` json NULL, \`new_values\` json NULL, \`ip_address\` varchar(45) NULL, \`user_agent\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9a8a82462cab47c73d25f49261f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_status\` ADD CONSTRAINT \`FK_9bab6c49e02f517fd2efd6c1a91\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`audit_logs\` ADD CONSTRAINT \`FK_bd2726fd31b35443f2245b93ba0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`audit_logs\` DROP FOREIGN KEY \`FK_bd2726fd31b35443f2245b93ba0\``);
        await queryRunner.query(`ALTER TABLE \`user_status\` DROP FOREIGN KEY \`FK_9bab6c49e02f517fd2efd6c1a91\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9a8a82462cab47c73d25f49261f\``);
        await queryRunner.query(`DROP TABLE \`audit_logs\``);
        await queryRunner.query(`DROP INDEX \`REL_9bab6c49e02f517fd2efd6c1a9\` ON \`user_status\``);
        await queryRunner.query(`DROP INDEX \`IDX_9bab6c49e02f517fd2efd6c1a9\` ON \`user_status\``);
        await queryRunner.query(`DROP TABLE \`user_status\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
