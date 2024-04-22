import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { Publications } from 'src/entity/Publications';
import { User } from 'src/entity/User';
import { NotificationEntity } from 'src/entity/notification';

@Injectable()
export class NotificationService {
  private bd__notification = AppDataSource.getRepository(NotificationEntity);
  private bd__user = AppDataSource.getRepository(User);
  private bd__publication = AppDataSource.getRepository(Publications);

  async create(
    id: string,
    user__id: string,
    enumType: number,
    id__publication: string,
    text: string,
  ) {
    const notifications = await this.bd__user.findOne({
      where: { id },
      relations: { notification: true },
    });
    const user = await this.bd__user.findOneBy({ id: user__id });

    const publication = await this.bd__publication.findOneBy({
      id: id__publication,
    });

    const notification = this.bd__notification.create({
      publication: id__publication,
      text,
      enumType,
      imagePublication: publication.image,
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
      order: { notification: { created_at: 'DESC' } },
      relations: { notification: true },
    });

    return user.notification;
  }

  async deleteNotifications(id: string) {
    await this.bd__notification.delete({ id });
  }

  async readNotification(id: string) {
    await this.bd__notification.update({ id }, { read: true });
  }
}
