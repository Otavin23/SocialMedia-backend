import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1713763765661 implements MigrationInterface {
    name = 'CreateUser1713763765661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" character varying NOT NULL DEFAULT 'b22ac4f8-ae33-4153-95c4-f4e45013071a', "name" character varying, "description" character varying, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" character varying NOT NULL DEFAULT '0935c945-cf7f-4d3b-9c0e-adca8f247dc8', "description" character varying, "user" jsonb NOT NULL DEFAULT '[]', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Hearts" ("id" character varying NOT NULL DEFAULT '3ebfa9e7-0f0a-478e-a3c2-c1e615c58c77', "user" jsonb NOT NULL DEFAULT '[]', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_139d86a53d1730a8e9d8d12bcd4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publication" ("id" character varying NOT NULL DEFAULT '44426155-b80e-4977-87bb-bf139dd25031', "description" character varying NOT NULL, "like" integer NOT NULL, "image" character varying NOT NULL, "craeted_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" character varying NOT NULL DEFAULT '2ea9aa76-e5ef-4a7a-9cdf-e8bee1421014', "publication" character varying, "text" character varying, "read" boolean, "imagePublication" character varying, "users" jsonb NOT NULL DEFAULT '[]', "enumType" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("MessageId" character varying NOT NULL DEFAULT '0d017d0f-a788-44be-9094-cfd749938919', "chatOnlyUser" jsonb NOT NULL DEFAULT '{}', "content" jsonb NOT NULL DEFAULT '[]', "DateRead" boolean, "fromIdId" character varying, CONSTRAINT "PK_22341075ce53d773bf39f7d1df2" PRIMARY KEY ("MessageId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL DEFAULT 'cb697c14-6d37-4669-a78a-2bf2efcb0516', "avatar" character varying, "background" character varying, "description" character varying, "name" character varying, "email" character varying, "country" character varying, "subTitle" character varying, "city" character varying, "password" character varying, "followers" jsonb NOT NULL DEFAULT '[]', "invitations" jsonb NOT NULL DEFAULT '[]', "experiences" jsonb NOT NULL DEFAULT '[]', "craeted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publication_comments_comments" ("publicationId" character varying NOT NULL, "commentsId" character varying NOT NULL, CONSTRAINT "PK_5aa7a5fa2b0c371b4a5a18b6c5b" PRIMARY KEY ("publicationId", "commentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b442e6fba3830604a08a8e51dd" ON "publication_comments_comments" ("publicationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_35ceaa40cec7691e4fe493182a" ON "publication_comments_comments" ("commentsId") `);
        await queryRunner.query(`CREATE TABLE "publication_heart_hearts" ("publicationId" character varying NOT NULL, "heartsId" character varying NOT NULL, CONSTRAINT "PK_3ac0ac1752afef97b7e1ee88277" PRIMARY KEY ("publicationId", "heartsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ccdf36a48867ad570770ce1896" ON "publication_heart_hearts" ("publicationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_91592082310b595d492646bbb6" ON "publication_heart_hearts" ("heartsId") `);
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
        await queryRunner.query(`DROP INDEX "public"."IDX_91592082310b595d492646bbb6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccdf36a48867ad570770ce1896"`);
        await queryRunner.query(`DROP TABLE "publication_heart_hearts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35ceaa40cec7691e4fe493182a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b442e6fba3830604a08a8e51dd"`);
        await queryRunner.query(`DROP TABLE "publication_comments_comments"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "publication"`);
        await queryRunner.query(`DROP TABLE "Hearts"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
