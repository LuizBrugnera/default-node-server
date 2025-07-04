import { MigrationInterface, QueryRunner } from "typeorm";

export class SUPPORTENTITIES1751590371578 implements MigrationInterface {
  name = "SUPPORTENTITIES1751590371578";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`support_messages\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`ticket_id\` bigint UNSIGNED NOT NULL, \`sender_id\` bigint UNSIGNED NOT NULL, \`message\` text NOT NULL, \`is_admin_message\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`support_tickets\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NOT NULL, \`assigned_admin_id\` bigint UNSIGNED NULL, \`subject\` varchar(200) NOT NULL, \`description\` text NOT NULL, \`status\` enum ('open', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'open', \`priority\` enum ('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`support_messages\` ADD CONSTRAINT \`FK_d5e0c744062d01ccda719d7ef17\` FOREIGN KEY (\`ticket_id\`) REFERENCES \`support_tickets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`support_messages\` ADD CONSTRAINT \`FK_db9f9d46849e30b9ac570db6eb6\` FOREIGN KEY (\`sender_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`support_tickets\` ADD CONSTRAINT \`FK_0b1eb4f1f984aab3c481c48468a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`support_tickets\` ADD CONSTRAINT \`FK_a1f62770508fc8eff38c11c81ea\` FOREIGN KEY (\`assigned_admin_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_tickets\` DROP FOREIGN KEY \`FK_a1f62770508fc8eff38c11c81ea\``
    );
    await queryRunner.query(
      `ALTER TABLE \`support_tickets\` DROP FOREIGN KEY \`FK_0b1eb4f1f984aab3c481c48468a\``
    );
    await queryRunner.query(
      `ALTER TABLE \`support_messages\` DROP FOREIGN KEY \`FK_db9f9d46849e30b9ac570db6eb6\``
    );
    await queryRunner.query(
      `ALTER TABLE \`support_messages\` DROP FOREIGN KEY \`FK_d5e0c744062d01ccda719d7ef17\``
    );
    await queryRunner.query(`DROP TABLE \`support_tickets\``);
    await queryRunner.query(`DROP TABLE \`support_messages\``);
  }
}
