import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveWeddingInvitation1732764705808
  implements MigrationInterface
{
  name = 'RemoveWeddingInvitation1732764705808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` ADD \`detailedAddress\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wedding_invitation\` DROP COLUMN \`detailedAddress\``,
    );
  }
}
