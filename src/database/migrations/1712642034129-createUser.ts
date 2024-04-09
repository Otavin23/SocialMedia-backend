import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1712642034129 implements MigrationInterface {
  name = 'CreateUser1712642034129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT '9d134f17-0aa9-4a00-95b3-ff13235d8263'`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '35ac074c-db75-4f89-8b27-e80b60e0d7ab'`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '51fda987-8fec-4153-88e5-4b13e845b8f3'`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '60823fce-4897-4fa7-82ef-bb665bf5e21e'`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '87e80271-32b9-470e-9f02-bcb9168da405'`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT '196383a4-6b13-4127-bab3-215f7bb51844'`,
    );
  }
}
