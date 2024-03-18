import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1702249332668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
          },
          {
            name: 'projects',
            type: 'jsonb',
          },
          {
            name: 'followers',
            type: 'jsonb',
          },
          {
            name: 'invitations',
            type: 'jsonb',
          },
          {
            name: 'following',
            type: 'jsonb',
          },
          {
            name: 'backgroundd',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('user');
  }
}
