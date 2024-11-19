import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionTable1732013233225 implements MigrationInterface {
  name = 'CreateTransactionTable1732013233225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction\` (
            \`id\` int NOT NULL AUTO_INCREMENT, 
            \`checkListId\` int NOT NULL, 
            \`cost\` int NOT NULL, 
            \`paymentDate\` date NULL, 
            \`memo\` varchar(255) NULL, 
            \`costType\` enum ('base', 'additional') NOT NULL DEFAULT 'base', 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            INDEX \`checkListId\` (\`checkListId\`), 
            PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`checkListId\` ON \`transaction\``);
    await queryRunner.query(`DROP TABLE \`transaction\``);
  }
}
