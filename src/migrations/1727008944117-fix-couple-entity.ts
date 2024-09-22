import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCoupleEntity1727008944117 implements MigrationInterface {
  name = 'FixCoupleEntity1727008944117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` DROP COLUMN \`weddingDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` DROP COLUMN \`coupleStartDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`couple\` ADD \`weddingDate\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`couple\` ADD \`coupleStartDate\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthday\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthday\` date NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthday\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`birthday\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`couple\` DROP COLUMN \`coupleStartDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`couple\` DROP COLUMN \`weddingDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` ADD \`coupleStartDate\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` ADD \`weddingDate\` datetime NULL`,
    );
  }
}
