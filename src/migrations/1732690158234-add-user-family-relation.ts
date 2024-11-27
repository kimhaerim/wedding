import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserFamilyRelation1732690158234 implements MigrationInterface {
  name = 'AddUserFamilyRelation1732690158234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_family\` CHANGE \`relation\` \`relation\` enum ('self', 'father', 'mother', 'grandmother', 'grandfather') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_family\` CHANGE \`relation\` \`relation\` enum ('father', 'mother', 'grandmother', 'grandfather') NOT NULL`,
    );
  }
}
