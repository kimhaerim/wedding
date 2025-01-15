import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCostEntity1736758763723 implements MigrationInterface {
  name = 'UpdateCostEntity1736758763723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cost\` ADD \`title\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`cost\` ADD \`categoryId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`cost\` CHANGE \`checkListId\` \`checkListId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`categoryId\` ON \`cost\` (\`categoryId\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`categoryId\` ON \`cost\``);
    await queryRunner.query(
      `ALTER TABLE \`cost\` CHANGE \`checkListId\` \`checkListId\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`cost\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(`ALTER TABLE \`cost\` DROP COLUMN \`title\``);
  }
}
