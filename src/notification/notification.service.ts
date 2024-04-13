import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';
import { NotificationEntity } from 'src/entity/notification';

@Injectable()
export class NotificationService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  private bd__notification = AppDataSource.getRepository(NotificationEntity);
  private bd__user = AppDataSource.getRepository(User);

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
  }

  async create(id: string) {
    const notifications = await this.bd__user.findOne({
      where: { id },
      relations: { notification: true },
    });

    const notification = this.bd__notification.create({
      description: 'hello people',
      title: 'Ola mundo',
    });

    notifications.notification.push(notification);

    await this.bd__notification.save(notification);
    await this.bd__user.save(notifications);

    return notifications.notification;
  }

  async listNotification(id: string) {
    const user = await this.bd__user.findOne({
      where: { id },
      relations: { notification: true },
    });

    return user.notification;
  }
}
