import { DataSource } from 'typeorm';

import { config } from 'dotenv';

import { User } from '../entity/User';
import { Projects } from '../entity/Project';
import { Publications } from '../entity/Publications';
import { Comments } from '../entity/Comments';
import { IHeart } from '../entity/heart';
import { NotificationEntity } from '../entity/notification';
import { Chat } from '../entity/message';

config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Projects,
    Publications,
    Comments,
    IHeart,
    NotificationEntity,
    Chat,
  ],
  migrations: ['src/migration/**/*{.js,.ts}'],
  subscribers: [],
});

export { AppDataSource };
