import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1713854187414 implements MigrationInterface {
    name = 'CreateUser1713854187414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT '5018488d-1c75-4867-96fb-920ff2137c28'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT 'f1e3c759-54f1-4dbc-80e4-635a10705723'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_91592082310b595d492646bbb60"`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT '4fb45a98-0349-40e5-aa2e-f7afd103e183'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_ccdf36a48867ad570770ce18968"`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '8cceeba6-7e7f-4a27-8fb2-709bc950c4f0'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT 'bfeb25d1-003e-42e6-9ecf-18d11972df4d'`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT '55354c08-3bb2-4edd-97ad-d2ec7c4cb202'`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP CONSTRAINT "FK_ca72b09f205afc223b9866471fe"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_0fbab9211d88fd6f0fb5e9a53fa"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '25cd6c99-0659-46a4-a9cd-34ac31e233e5'`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publication" ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_0fbab9211d88fd6f0fb5e9a53fa" FOREIGN KEY ("fromIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_0fbab9211d88fd6f0fb5e9a53fa"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP CONSTRAINT "FK_ca72b09f205afc223b9866471fe"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '951ab19b-ba6d-458b-9d1c-4d8e2d8c38f5'`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_0fbab9211d88fd6f0fb5e9a53fa" FOREIGN KEY ("fromIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publication" ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT 'e92c4e2d-1df3-4706-a545-5d6948523b3f'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT 'ec07558b-b4ab-4679-a331-9fcbb0f9df86'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '03cc7bca-3b33-41af-8d42-02a1f2841092'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_ccdf36a48867ad570770ce18968" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT '79458a2d-a774-4ce5-a957-5a904b1d94ab'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_91592082310b595d492646bbb60" FOREIGN KEY ("heartsId") REFERENCES "Hearts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '5d4a314c-db9d-48a4-8aaa-a5bb3af1a80b'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT 'f4b9e63e-ab8b-45ef-83c3-00a2328375a9'`);
    }

}
