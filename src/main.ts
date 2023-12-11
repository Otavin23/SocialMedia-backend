import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  AppDataSource.initialize().then(() => {
    console.log('data_base started');
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
