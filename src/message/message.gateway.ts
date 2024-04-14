import {
  MessageBody,
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

      socket.on('disconnect', () => {
        this.socketMap.delete('socketId');
      });
    });
  }

  @SubscribeMessage('getMessage')
  async getMessages(@MessageBody() id: string) {
    const getChat = await this.MessageServices.getMessage(id);
    this.server.emit('getMessages', { data: getChat });
    return getChat;
  }

  @SubscribeMessage('addMessage')
  async handleMessage(
    @MessageBody() body: { id: string; chat__id: string; text: string },
  ) {
    const chat = await this.MessageServices.sendMessage(
      body.id,
      body.chat__id,
      body.text,
    );

    this.server.emit('addMessage', { data: chat });

    return chat;
  }

  async listMessages(id: string) {
    const listMessages = await this.MessageServices.listMessages(id);

    return listMessages;
  }

  async getMessage(id: string) {
    const getMessage = await this.MessageServices.getMessage(id);

    return getMessage;
  }

  // // async listNotification(id: string) {
  // //   // const socketMeta = this.socketMap.get('socketId');

  // //   const listNotification = await this.MessageServices.listNotification(id);

  // //   // if (!socketMeta) console.log('user is not online at the moment!');

  // //   // this.server.to(socketMeta).emit('listNotification', listNotification);

  // //   return listNotification;
  // // }

  // @SubscribeMessage('currentUsers')
  // async currentUsers(client: Socket) {
  //   client.emit('currentUsers', Array.from(this.socketMap.values()));
  // }
}
