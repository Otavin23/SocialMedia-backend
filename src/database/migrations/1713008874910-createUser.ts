import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1713008874910 implements MigrationInterface {
    name = 'CreateUser1713008874910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT '8d3f5c5e-2e44-41dc-9af9-dea68a5880e6'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '667ea069-2233-4853-9dfd-708b86e5b052'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_91592082310b595d492646bbb60"`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT 'a7098823-1b03-49c5-98bc-da5a1f3afeae'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_ccdf36a48867ad570770ce18968"`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT 'c2aeffb5-7bc3-4d7c-8aef-a0f50cefa1e1'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT 'd3b7aa31-2831-4adf-b3f4-bab861548f09'`);
        await queryRunner.query(`ALTER TABLE "chat_from_id_user" DROP CONSTRAINT "FK_0edb1012ab4384d858fc3ec891e"`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT '149d38e6-21ca-4183-a0b5-c741eeb03730'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_ccdf36a48867ad570770ce18968" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_91592082310b595d492646bbb60" FOREIGN KEY ("heartsId") REFERENCES "Hearts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "chat_from_id_user" ADD CONSTRAINT "FK_0edb1012ab4384d858fc3ec891e" FOREIGN KEY ("chatMessageId") REFERENCES "chat"("MessageId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_from_id_user" DROP CONSTRAINT "FK_0edb1012ab4384d858fc3ec891e"`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_91592082310b595d492646bbb60"`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_ccdf36a48867ad570770ce18968"`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT 'e24f6405-9310-4724-9077-9a2e9ddf8374'`);
        await queryRunner.query(`ALTER TABLE "chat_from_id_user" ADD CONSTRAINT "FK_0edb1012ab4384d858fc3ec891e" FOREIGN KEY ("chatMessageId") REFERENCES "chat"("MessageId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT '9e8b883d-9df3-4a2d-ba18-adbd6fa355cc'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '0cd692c7-be75-4ff9-856a-d61731bec7d0'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_ccdf36a48867ad570770ce18968" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT '19d2d9b2-9a14-4781-8433-93968f9cc26b'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_91592082310b595d492646bbb60" FOREIGN KEY ("heartsId") REFERENCES "Hearts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '35636bf8-373f-46ef-82d2-9ee84abbe4d6'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT '0227776e-6858-44af-923f-3ce34ec30cc7'`);
    }

}
