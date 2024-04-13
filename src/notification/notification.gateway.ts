import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

// interface JwtPayload {
//   _id: string;
//   email?: string;
//   username?: string;
//   iat?: number;
//   exp?: number;
// }

export interface socketMetaPayload {
  socketId: string;
}

@WebSocketGateway({
  crossOriginIsolated: true,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class NotificationGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  socketMap = new Map<string, string>();

  constructor(private readonly notificationService: NotificationService) {}

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      this.socketMap.set('socketId', socket.id);

      socket.on('disconnect', () => {
        this.socketMap.delete('socketId');
      });
    });
  }

  async emitNotification(userId: string) {
    const socketMeta = this.socketMap.get('socketId');

    const cardNotification = await this.notificationService.create(userId);

    if (!socketMeta) console.log('user is not online at the moment!');

    this.server.to(socketMeta).emit('notification', cardNotification);
    return cardNotification;
  }

  async listNotification(id: string) {
    const socketMeta = this.socketMap.get('socketId');

    const listNotification =
      await this.notificationService.listNotification(id);

    if (!socketMeta) console.log('user is not online at the moment!');

    this.server.to(socketMeta).emit('listNotification', listNotification);
  }

  @SubscribeMessage('currentUsers')
  async currentUsers(client: Socket) {
    client.emit('currentUsers', Array.from(this.socketMap.values()));
  }
}
