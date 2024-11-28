import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyWeddingInvitation1732763869770
  implements MigrationInterface
{
  name = 'ModifyWeddingInvitation1732763869770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`userId\` ON \`wedding_chat\``);
    await queryRunner.query(`CREATE TABLE \`wedding_chat_message\` (
            \`id\` int NOT NULL AUTO_INCREMENT, 
            \`uuid\` varchar(255) NOT NULL, 
            \`weddingChatId\` int NOT NULL, 
            \`userId\` int NULL, 
            \`nickname\` varchar(255) NOT NULL, 
            \`message\` varchar(255) NOT NULL, 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            INDEX \`weddingChatId\` (\`weddingChatId\`), 
            INDEX \`userId\` (\`userId\`), 
            PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` DROP COLUMN \`uuid\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` DROP COLUMN \`message\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` ADD \`chatEnabled\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` ADD \`attendanceEnabled\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` ADD \`title\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` ADD \`description\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` DROP COLUMN \`title\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` DROP COLUMN \`chatEnabled\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` ADD \`message\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` ADD \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_chat\` ADD \`uuid\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`userId\` ON \`wedding_chat_message\``,
    );
    await queryRunner.query(
      `DROP INDEX \`weddingChatId\` ON \`wedding_chat_message\``,
    );
    await queryRunner.query(`DROP TABLE \`wedding_chat_message\``);
    await queryRunner.query(
      `CREATE INDEX \`userId\` ON \`wedding_chat\` (\`userId\`)`,
    );
  }
}
