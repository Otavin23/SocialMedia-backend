import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/User';
import { AppDataSource } from 'src/database/data-source';
import { Chat } from 'src/entity/message';

@Injectable()
class NetworkService {
  private bd_user = AppDataSource.getRepository(User);
  private bd_chat = AppDataSource.getRepository(Chat);

  async networkInvite(user__id: string, id: string) {
    const user = await this.bd_user.findOneBy({ id });

    const secondaryUser = await this.bd_user.findOneBy({ id: user__id });

    secondaryUser.invitations.push(user);

    await this.bd_user.save(secondaryUser);

    return secondaryUser.invitations;
  }

  async NetworkListInvites(id: string) {
    const user = await this.bd_user.findOneBy({ id });

    return user.invitations;
  }

  async inviteAccept(user__id: string, id: string) {
    const user = await this.bd_user.findOne({
      where: { id },
      relations: { messagesChat: { FromId: true } },
    });

    const secondaryUser = await this.bd_user.findOne({
      where: { id: user__id },
      relations: { messagesChat: { FromId: true } },
    });

    user.followers.push(secondaryUser);

    user.invitations.splice(user.invitations.indexOf(secondaryUser), 1);

    const chat = this.bd_chat.create({
      DateRead: false,
      content: [],
      chatOnlyUser: {
        avatar: secondaryUser.avatar,
        id: secondaryUser.id,
        name: secondaryUser.name,
      },
      FromId: secondaryUser,
    });

    user.messagesChat.push(chat);
    secondaryUser.messagesChat.push(chat);

    await this.bd_chat.save(chat);
    await this.bd_user.save(user);
    await this.bd_user.save(secondaryUser);

    return user;
  }

  async declineAccept(user__id: string, id: string) {
    const user = await this.bd_user.findOneBy({ id });

    const inviteRemove = user.invitations.find(
      (invitation) => invitation.id === user__id,
    );

    user.invitations.splice(user.invitations.indexOf(inviteRemove), 1);

    await this.bd_user.save(user);

    return user;
  }

  async networkLists() {
    const user = await this.bd_user.find();

    return user;
  }
}

export { NetworkService };
