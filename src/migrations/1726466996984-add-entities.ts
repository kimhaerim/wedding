import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEntities1726466996984 implements MigrationInterface {
  name = 'AddEntities1726466996984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`wedding_invitation\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`coupleId\` int NOT NULL,
        \`title\` varchar(255) NOT NULL,
        \`description\` varchar(255) NOT NULL,
        \`weddingDate\` datetime NULL,
        \`coupleStartDate\` date NULL,
        \`address\` varchar(255) NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX \`coupleId\` (\`coupleId\`),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wedding_chat\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`uuid\` varchar(255) NOT NULL,
        \`weddingInvitationId\` int NOT NULL,
        \`userId\` int NULL,
        \`message\` varchar(255) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX \`weddingInvitationId\` (\`weddingInvitationId\`),
        INDEX \`userId\` (\`userId\`),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wedding_attend\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`weddingInvitationId\` int NOT NULL,
        \`title\` varchar(255) NOT NULL,
        \`description\` varchar(255) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wedding_attend_answer\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`weddingAttendId\` int NOT NULL,
        \`uuid\` varchar(255) NOT NULL,
        \`userId\` varchar(255) NULL,
        \`name\` varchar(255) NOT NULL,
        \`isAttend\` tinyint NOT NULL,
        \`peopleCount\` int NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX \`weddingAttendId\` (\`weddingAttendId\`),
        UNIQUE INDEX \`weddingAttendId_userId\` (\`weddingAttendId\`, \`userId\`),
        UNIQUE INDEX \`weddingAttendId_uuid\` (\`weddingAttendId\`, \`uuid\`),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_family\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`userId\` int NOT NULL,
        \`relation\` enum ('father', 'mother', 'grandmother', 'grandfather') NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`isDecease\` tinyint NOT NULL,
        \`phoneNumber\` varchar(255) NULL,
        \`accountNumber\` varchar(255) NULL,
        \`bank\` varchar(255) NULL,
        \`accountHolder\` varchar(255) NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX \`userId\` (\`userId\`),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`coupleId\` int NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`birthday\` datetime NULL,
        \`gender\` enum ('male', 'female') NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX \`coupleId\` (\`coupleId\`),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`file\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`weddingInvitationId\` int NULL,
        \`coupleId\` int NOT NULL,
        \`target\` varchar(255) NOT NULL,
        \`path\` varchar(255) NOT NULL,
        \`sequence\` int NOT NULL DEFAULT '0',
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
         INDEX \`weddingInvitationId\` (\`weddingInvitationId\`),
         INDEX \`coupleId\` (\`coupleId\`),
         PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`couple\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`check_list\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`checkListCategoryId\` int NOT NULL,
        \`description\` varchar(255) NOT NULL,
        \`reservedDate\` datetime NULL,
        \`completedAt\` date NULL,
        \`memo\` varchar(255) NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX \`checkListCategoryId\` (\`checkListCategoryId\`),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`check_list_category\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`coupleId\` int NOT NULL,
        \`category\` varchar(255) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX \`coupleId\` (\`coupleId\`),
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`coupleId\` ON \`check_list_category\``,
    );
    await queryRunner.query(`DROP TABLE \`check_list_category\``);
    await queryRunner.query(
      `DROP INDEX \`checkListCategoryId\` ON \`check_list\``,
    );
    await queryRunner.query(`DROP TABLE \`check_list\``);
    await queryRunner.query(`DROP TABLE \`couple\``);
    await queryRunner.query(`DROP INDEX \`coupleId\` ON \`file\``);
    await queryRunner.query(`DROP INDEX \`weddingInvitationId\` ON \`file\``);
    await queryRunner.query(`DROP TABLE \`file\``);
    await queryRunner.query(`DROP INDEX \`coupleId\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP INDEX \`userId\` ON \`user_family\``);
    await queryRunner.query(`DROP TABLE \`user_family\``);
    await queryRunner.query(
      `DROP INDEX \`weddingAttendId_uuid\` ON \`wedding_attend_answer\``,
    );
    await queryRunner.query(
      `DROP INDEX \`weddingAttendId_userId\` ON \`wedding_attend_answer\``,
    );
    await queryRunner.query(
      `DROP INDEX \`weddingAttendId\` ON \`wedding_attend_answer\``,
    );
    await queryRunner.query(`DROP TABLE \`wedding_attend_answer\``);
    await queryRunner.query(`DROP TABLE \`wedding_attend\``);
    await queryRunner.query(`DROP INDEX \`userId\` ON \`wedding_chat\``);
    await queryRunner.query(
      `DROP INDEX \`weddingInvitationId\` ON \`wedding_chat\``,
    );
    await queryRunner.query(`DROP TABLE \`wedding_chat\``);
    await queryRunner.query(
      `DROP INDEX \`coupleId\` ON \`wedding_invitation\``,
    );
    await queryRunner.query(`DROP TABLE \`wedding_invitation\``);
  }
}
