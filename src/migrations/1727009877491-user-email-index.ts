import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEmailIndex1727009877491 implements MigrationInterface {
  name = 'UserEmailIndex1727009877491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`email\` ON \`user\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``,
    );
  }
}
