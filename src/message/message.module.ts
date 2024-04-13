import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { AppService } from './message.service';
import { AppController } from './message.controller';

@Module({
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})
export class SocketModuleMessage {}
