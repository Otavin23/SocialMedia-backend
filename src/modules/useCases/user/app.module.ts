import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './app.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
