import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1711921283124 implements MigrationInterface {
    name = 'CreateUser1711921283124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "comments" jsonb NOT NULL DEFAULT '[]', "like" character varying, "heart" character varying, "media" character varying, "userId" character varying, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publication" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "comments" jsonb NOT NULL DEFAULT '[]', "like" integer NOT NULL, "heart" integer NOT NULL, "image" character varying NOT NULL, "userId" character varying, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL DEFAULT '', "avatar" character varying, "background" character varying, "description" character varying, "name" character varying, "email" character varying, "country" character varying, "subTitle" character varying, "city" character varying, "password" character varying, "followers" jsonb NOT NULL DEFAULT '[]', "invitations" jsonb NOT NULL DEFAULT '[]', "experiences" jsonb NOT NULL DEFAULT '[]', "following" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publication" ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" DROP CONSTRAINT "FK_ca72b09f205afc223b9866471fe"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "publication"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
