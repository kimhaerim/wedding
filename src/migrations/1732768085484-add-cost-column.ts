import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCostColumn1732768085484 implements MigrationInterface {
  name = 'AddCostColumn1732768085484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`categoryId\` ON \`cost\``);
    await queryRunner.query(
      `ALTER TABLE \`cost\` CHANGE \`categoryId\` \`checkListId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`checkListId\` ON \`cost\` (\`checkListId\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`checkListId\` ON \`cost\``);
    await queryRunner.query(
      `ALTER TABLE \`cost\` CHANGE \`checkListId\` \`categoryId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`categoryId\` ON \`cost\` (\`categoryId\`)`,
    );
  }
}
