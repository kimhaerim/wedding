import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntities1737094466211 implements MigrationInterface {
  name = 'UpdateEntities1737094466211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`categoryId\` ON \`cost\``);
    await queryRunner.query(`ALTER TABLE \`cost\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(
      `ALTER TABLE \`check_list\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cost\` ADD \`isIncludeBudget\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cost\` CHANGE \`checkListId\` \`checkListId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`check_list\` CHANGE \`categoryId\` \`categoryId\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`check_list\` CHANGE \`categoryId\` \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cost\` CHANGE \`checkListId\` \`checkListId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cost\` DROP COLUMN \`isIncludeBudget\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`check_list\` ADD \`status\` enum ('confirmed', 'pending', 'rejected') NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`cost\` ADD \`categoryId\` int NULL`);
    await queryRunner.query(
      `CREATE INDEX \`categoryId\` ON \`cost\` (\`categoryId\`)`,
    );
  }
}
