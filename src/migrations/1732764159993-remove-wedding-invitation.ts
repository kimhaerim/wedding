import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveWeddingInvitation1732764159993
  implements MigrationInterface
{
  name = 'RemoveWeddingInvitation1732764159993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` DROP COLUMN \`chatEnabled\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` DROP COLUMN \`attendanceEnabled\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` ADD \`attendanceEnabled\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` ADD \`chatEnabled\` tinyint NOT NULL`,
    );
  }
}
