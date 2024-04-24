import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';

import { v2 as cloudinary } from 'cloudinary';
import { Server } from 'socket.io';

const socketIo = new Server({
  cors: {
    origin: 'https://social-media-frotend.vercel.app/user/signin',
  },
});

socketIo.on('connection', (socket) => {
  socket.on('newEvent', (event) => {
    socket.emit('parafront', 'hello');
  });

  socket.on('disconnect', () => socket.disconnect());
});

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

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
