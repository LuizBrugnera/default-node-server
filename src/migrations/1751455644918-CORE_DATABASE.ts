import { MigrationInterface, QueryRunner } from "typeorm";

export class COREDATABASE1751455644918 implements MigrationInterface {
  name = "COREDATABASE1751455644918";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` tinyint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`files\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NOT NULL, \`filename\` varchar(255) NOT NULL, \`original_name\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`role_id\` tinyint UNSIGNED NOT NULL, \`full_name\` varchar(120) NOT NULL, \`email\` varchar(120) NOT NULL, \`cpf_or_cnpj\` varchar(18) NOT NULL, \`password_hash\` char(60) NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`videos\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`original_name\` varchar(255) NOT NULL, \`mime_type\` varchar(100) NOT NULL, \`path\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`photos\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`original_name\` varchar(255) NOT NULL, \`mime_type\` varchar(100) NOT NULL, \`path\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`files\` ADD CONSTRAINT \`FK_a7435dbb7583938d5e7d1376041\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``
    );
    await queryRunner.query(
      `ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_a7435dbb7583938d5e7d1376041\``
    );
    await queryRunner.query(`DROP TABLE \`photos\``);
    await queryRunner.query(`DROP TABLE \`videos\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`files\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
