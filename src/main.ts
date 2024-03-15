import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpputbvzd',
  api_key: '785231527784246',
  api_secret: 'Glq8snAAikOkdvIm5IeBPwJDFks',
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
