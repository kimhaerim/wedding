import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateChecklistTable1732012874166 implements MigrationInterface {
  name = 'UpdateChecklistTable1732012874166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`check_list\` ADD \`status\` enum ('confirmed', 'pending', 'rejected') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`check_list_category\` ADD \`budgetAmount\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`check_list_category\` DROP COLUMN \`budgetAmount\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`check_list\` DROP COLUMN \`status\``,
    );
  }
}
