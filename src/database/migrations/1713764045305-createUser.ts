import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1713764045305 implements MigrationInterface {
    name = 'CreateUser1713764045305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT '2bc811bb-bd76-4884-9184-c77c7cd8ba12'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '97f9d7da-6280-4166-89dd-ade6a9c4f910'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_91592082310b595d492646bbb60"`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT '1f9fe12b-d775-4ded-a144-d9291f7364ff'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" DROP CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1"`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" DROP CONSTRAINT "FK_ccdf36a48867ad570770ce18968"`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '082842c2-ecec-4c4a-be21-16ba08fe4ef1'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT '8dd53fa1-4590-4714-b55f-4a44b4e7a4f1'`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT '1f95cc51-10cf-47fe-9d3f-1f3397eaadd8'`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP CONSTRAINT "FK_ca72b09f205afc223b9866471fe"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_0fbab9211d88fd6f0fb5e9a53fa"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '65be1f4f-8547-41e1-a784-e4328063d374'`);
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
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT 'e599bef3-0e92-4633-9213-63aa05010711'`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_0fbab9211d88fd6f0fb5e9a53fa" FOREIGN KEY ("fromIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publication" ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "MessageId" SET DEFAULT 'e662f7b8-0026-471b-b6e3-69c421de01a7'`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT '3018c946-56bf-4416-854d-912511fd353b'`);
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '0f6f4498-f457-458f-947a-16fad2ff42b5'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_ccdf36a48867ad570770ce18968" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_b442e6fba3830604a08a8e51dd1" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Hearts" ALTER COLUMN "id" SET DEFAULT '62747890-7f69-4495-8271-0bf75d986770'`);
        await queryRunner.query(`ALTER TABLE "publication_heart_hearts" ADD CONSTRAINT "FK_91592082310b595d492646bbb60" FOREIGN KEY ("heartsId") REFERENCES "Hearts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT '4a529e55-9e41-4594-bb35-ac3656f4c2cb'`);
        await queryRunner.query(`ALTER TABLE "publication_comments_comments" ADD CONSTRAINT "FK_35ceaa40cec7691e4fe493182a3" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT 'bb643e29-e7b1-425c-ab1d-072a01f1e8ae'`);
    }

}
