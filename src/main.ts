import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'daj1njq3t',
  api_key: '957428935138418',
  api_secret: 'mnxl2MjUsnsITb6tDVX5fB3VVZg',
});

async function bootstrap() {
  AppDataSource.initialize().then(() => {
    console.log('data_base started');
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
