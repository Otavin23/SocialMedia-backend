import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/User';
import { AppDataSource } from 'src/database/data-source';
import { Chat } from 'src/entity/message';

@Injectable()
class NetworkService {
  private bd_user = AppDataSource.getRepository(User);
  private bd_chat = AppDataSource.getRepository(Chat);

  async networkInvite(user__id: string, id: string) {
    const user = await this.bd_user.findOne({
      where: { id },
    });
    const secondaryUser = await this.bd_user.findOne({
      where: { id: user__id },
    });

    const filterAlreadyExistsInvitations = secondaryUser.invitations.find(
      (invitation) => invitation.id === user.id,
    );
    const filterAlreadyExistsFollow = secondaryUser.followers.find(
      (follow) => follow.id === user.id,
    );

    if (filterAlreadyExistsInvitations)
      throw new Error('Pedido de amizade já enviado.');

    if (filterAlreadyExistsFollow) throw new Error('Usuário já é seu amigo');

    secondaryUser.invitations.push({
      id: user.id,
      name: user.name,
      image: user.avatar,
      subTitle: user.subTitle,
      mark: false,
    });

    await this.bd_user.save(secondaryUser);

    return secondaryUser;
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

    user.invitations.splice(user.invitations.indexOf(secondaryUser), 1);

    const chat = this.bd_chat.create({
      DateRead: false,
      content: [],
      FromId: user,
      chatOnlyUser: {
        avatar: secondaryUser.avatar,
        id: secondaryUser.id,
        name: secondaryUser.name,
      },
    });

    user.messagesChat.push(chat);
    secondaryUser.messagesChat.push(chat);

    user.followers.push({
      id: secondaryUser.id,
      name: secondaryUser.name,
      image: secondaryUser.avatar,
      subTitle: secondaryUser.subTitle,
      mark: false,
      idChat: chat.MessageId,
    });

    secondaryUser.followers.push({
      id: user.id,
      name: user.name,
      image: user.avatar,
      subTitle: user.subTitle,
      mark: false,
      idChat: chat.MessageId,
    });

    await this.bd_user.save(user);

    await this.bd_user.save(secondaryUser);

    await this.bd_chat.save(chat);

    return secondaryUser;
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

  async networkLists(removeId: string) {
    const user = await this.bd_user.find({
      order: { craeted_at: 'DESC' },
    });

    const filterUsers = user.map((user) => user.id !== removeId && user);
    return filterUsers.filter((user) => user);
  }

  async listMarks(id: string) {
    const user = await this.bd_user.findOneBy({ id });

    return user.invitations;
  }
}

export { NetworkService };
