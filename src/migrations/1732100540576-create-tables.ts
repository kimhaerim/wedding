import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1732100540576 implements MigrationInterface {
  name = 'CreateTables1732100540576';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `CREATE TABLE \`wedding_invitation\` (
            \`id\` int NOT NULL AUTO_INCREMENT, 
            \`coupleId\` int NOT NULL, 
            \`title\` varchar(255) NOT NULL, 
            \`description\` varchar(255) NOT NULL, 
            \`address\` varchar(255) NULL, 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            INDEX \`coupleId\` (\`coupleId\`), 
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
            \`password\` varchar(255) NULL, 
            \`name\` varchar(255) NOT NULL, 
            \`birthday\` date NULL, 
            \`gender\` enum ('male', 'female') NOT NULL, 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            INDEX \`coupleId\` (\`coupleId\`), 
            UNIQUE INDEX \`email\` (\`email\`), 
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
            \`weddingDate\` datetime NULL, 
            \`coupleStartDate\` date NULL, 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cost\` (
            \`id\` int NOT NULL AUTO_INCREMENT, 
            \`categoryId\` int NOT NULL, 
            \`amount\` int NOT NULL, 
            \`paymentDate\` date NULL, 
            \`memo\` varchar(255) NULL, 
            \`costType\` enum ('base', 'additional') NOT NULL DEFAULT 'base', 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            INDEX \`categoryId\` (\`categoryId\`), 
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
      `CREATE TABLE \`category\` (
            \`id\` int NOT NULL AUTO_INCREMENT, 
            \`coupleId\` int NOT NULL, 
            \`title\` varchar(255) NOT NULL, 
            \`budgetAmount\` int NOT NULL DEFAULT '0', 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            INDEX \`coupleId\` (\`coupleId\`), 
            UNIQUE INDEX \`title_couple_id\` (\`title\`, \`coupleId\`), 
            PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`check_list\` (
            \`id\` int NOT NULL AUTO_INCREMENT, 
            \`coupleId\` int NOT NULL, 
            \`categoryId\` int NULL, 
            \`description\` varchar(255) NOT NULL, 
            \`reservedDate\` datetime NULL, 
            \`completedAt\` date NULL, 
            \`memo\` varchar(255) NULL, 
            \`status\` enum ('confirmed', 'pending', 'rejected') NULL, 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            INDEX \`coupleId\` (\`coupleId\`), 
            INDEX \`categoryId\` (\`categoryId\`), 
            PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`categoryId\` ON \`check_list\``);
    await queryRunner.query(`DROP INDEX \`coupleId\` ON \`check_list\``);
    await queryRunner.query(`DROP TABLE \`check_list\``);
    await queryRunner.query(`DROP INDEX \`title_couple_id\` ON \`category\``);
    await queryRunner.query(`DROP INDEX \`coupleId\` ON \`category\``);
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(`DROP TABLE \`wedding_attend\``);
    await queryRunner.query(`DROP INDEX \`categoryId\` ON \`cost\``);
    await queryRunner.query(`DROP TABLE \`cost\``);
    await queryRunner.query(`DROP TABLE \`couple\``);
    await queryRunner.query(`DROP INDEX \`coupleId\` ON \`file\``);
    await queryRunner.query(`DROP INDEX \`weddingInvitationId\` ON \`file\``);
    await queryRunner.query(`DROP TABLE \`file\``);
    await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
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
    await queryRunner.query(
      `DROP INDEX \`coupleId\` ON \`wedding_invitation\``,
    );
    await queryRunner.query(`DROP TABLE \`wedding_invitation\``);
    await queryRunner.query(`DROP INDEX \`userId\` ON \`wedding_chat\``);
    await queryRunner.query(
      `DROP INDEX \`weddingInvitationId\` ON \`wedding_chat\``,
    );
    await queryRunner.query(`DROP TABLE \`wedding_chat\``);
  }
}
