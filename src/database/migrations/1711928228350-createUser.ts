import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1711928228350 implements MigrationInterface {
    name = 'CreateUser1711928228350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT 'aaedc4ff-9d80-4027-9e6b-584ec6700c75'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ALTER COLUMN "id" SET DEFAULT '37711d87-28ec-47be-8b86-8c11696a0e3a'`);
    }

}
