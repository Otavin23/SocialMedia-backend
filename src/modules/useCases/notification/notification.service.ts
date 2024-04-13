import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';
import { NotificationEntity } from 'src/entity/notification';

@Injectable()
export class NotificationService {
  private bd__notification = AppDataSource.getRepository(NotificationEntity);
  private bd__user = AppDataSource.getRepository(User);

  async create(id: string, user__id: string, enumType: number) {
    const notifications = await this.bd__user.findOne({
      where: { id },
      relations: { notification: true },
    });
    const user = await this.bd__user.findOneBy({ id: user__id });

    const notification = this.bd__notification.create({
      description: 'hello people',
      title: 'Ola mundo',
      enumType,
      users: {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
      },
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
