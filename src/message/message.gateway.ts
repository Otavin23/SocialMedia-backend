import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppService } from './message.service';
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
export class MessageGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  socketMap = new Map<string, string>();

  constructor(private readonly MessageServices: AppService) {}

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      this.socketMap.set('socketId', socket.id);
      const { id }: any = socket.handshake.query;

      const chat = await this.MessageServices.listMessage(id);

      socket.emit('description', { data: chat });

      socket.on('disconnect', () => {
        this.socketMap.delete('socketId');
      });
    });
  }

  async emitMessage(id: string) {
    const socketMeta = this.socketMap.get('socketId');

    const cardNotification = await this.MessageServices.createMessage(id);

    this.server.to(socketMeta).emit('message', cardNotification);

    return cardNotification;
  }

  async emmitMessageDefault(id, id_chat) {
    const socketMeta = this.socketMap.get('socketId');

    const cardNotification = await this.MessageServices.sendMessage(
      id,
      id_chat,
    );

    this.server.to(socketMeta).emit('sendMessage', cardNotification);

    return cardNotification;
  }

  async getMessages(id: string) {
    const listMessages = await this.MessageServices.listMessage(id);
    return listMessages;
  }

  // async listNotification(id: string) {
  //   // const socketMeta = this.socketMap.get('socketId');

  //   const listNotification = await this.MessageServices.listNotification(id);

  //   // if (!socketMeta) console.log('user is not online at the moment!');

  //   // this.server.to(socketMeta).emit('listNotification', listNotification);

  //   return listNotification;
  // }

  @SubscribeMessage('currentUsers')
  async currentUsers(client: Socket) {
    client.emit('currentUsers', Array.from(this.socketMap.values()));
  }
}
