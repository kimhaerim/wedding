import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserPassword1726472219221 implements MigrationInterface {
  name = 'FixUserPassword1726472219221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
  }
}
