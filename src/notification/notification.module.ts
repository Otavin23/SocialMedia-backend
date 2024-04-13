import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
})
export class SocketModule {}
