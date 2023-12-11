import { DataSource } from 'typeorm';

import { config } from 'dotenv';

import { User1702249332668 } from './migrations/1702249332668-User';

import { User } from '../entity/User';

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
  entities: [User],
  migrations: [User1702249332668],
  subscribers: [],
});

export { AppDataSource };
