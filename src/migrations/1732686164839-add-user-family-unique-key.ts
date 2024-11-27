import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserFamilyUniqueKey1732686164839 implements MigrationInterface {
  name = 'AddUserFamilyUniqueKey1732686164839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`userId_relation\` ON \`user_family\` (\`userId\`, \`relation\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`userId_relation\` ON \`user_family\``,
    );
  }
}
