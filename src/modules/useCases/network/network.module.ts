import { Module } from '@nestjs/common';
import { NetworkProfile } from './network.controller';
import { NetworkService } from './network.service';

@Module({
  controllers: [NetworkProfile],
  providers: [NetworkService],
})
export class NetworkModule {}
