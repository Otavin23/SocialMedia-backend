import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1713080831916 implements MigrationInterface {
    name = 'CreateUser1713080831916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT 'f786297d-89d6-4af1-b32d-e3de82fae1c9'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT 'eac81793-0983-408a-aab5-5b92c9da2104'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_91592082310b595d492646bbb60"`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT '732caafa-83a3-4942-95cd-497a70ecf416'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_ccdf36a48867ad570770ce18968"`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT 'a8fac496-ea0b-49e6-8704-cc20de7e6e6a'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT '40700643-2872-4b73-8e0f-753cccbccfea'`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT 'f368c680-446e-470d-9e95-f2023c9b7d2a'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_ccdf36a48867ad570770ce18968" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_91592082310b595d492646bbb60" FOREIGN KEY ("heartsId") REFERENCES "Hearts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_91592082310b595d492646bbb60"`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_ccdf36a48867ad570770ce18968"`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT '4add4ac2-584b-4f6d-bd75-fef4923c8852'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT '3dd0870d-15fe-4f3e-a947-0e2e372e387b'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT 'f5ba9c47-409e-4195-8064-a4a4ce25c302'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_ccdf36a48867ad570770ce18968" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT '61d4a5af-d79a-4540-99f0-7650d57b024f'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_91592082310b595d492646bbb60" FOREIGN KEY ("heartsId") REFERENCES "Hearts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '2afca293-40b7-463e-b8ce-e76a0ee9d00c'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT 'bd10cede-0353-48e2-bae7-cc19a8f7c47b'`);
    }

}
