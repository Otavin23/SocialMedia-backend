import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { ServiceFriendsService } from './friends.service';

@Module({
  controllers: [FriendsController],
  providers: [ServiceFriendsService],
})
export class ModuleFriendsModule {}
