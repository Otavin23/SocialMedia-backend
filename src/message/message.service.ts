import { Injectable } from '@nestjs/common';
import { Chat } from 'src/entity/message';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';

@Injectable()
export class AppService {
  private bd__chat = AppDataSource.getRepository(Chat);
  private bd__user = AppDataSource.getRepository(User);

  async createMessage(id: string, text) {
    const user = await this.bd__user.findOne({
      where: { id },
      relations: { messagesChat: { FromId: true } },
    });

    const chat = this.bd__chat.create({
      DateRead: false,
      content: [
        {
          id,
          text,
        },
      ],
    });

    user.messagesChat.push(chat);

    await this.bd__chat.save(chat);
    await this.bd__user.save(user);

    return user;
  }

  async sendMessage(id: string, id__chat: string, text: string) {
    const messageUser = await this.bd__chat.findOne({
      where: { MessageId: id__chat },
      relations: { FromId: true },
    });

    if (messageUser.FromId.id !== id) {
      messageUser.content.push({
        type: 'receive',
        value: text,
      });
      await this.bd__chat.save(messageUser);
    }

    if (messageUser.FromId.id === id) {
      messageUser.content.push({
        type: 'send',
        value: text,
      });
      await this.bd__chat.save(messageUser);
    }

    return messageUser;
  }

  async listMessage(id: string) {
    const chat = await this.bd__chat.findOne({
      where: { MessageId: id },
      relations: { FromId: true },
    });

    return chat;
  }

  // async getMessages(): Promise<Chat[]> {
  //   return await this.chatRepository.find();
  // }

  async listMessages(id: string) {
    const user = await this.bd__user.findOne({
      where: { id },
      relations: { messagesChat: { FromId: true } },
    });

    return user.messagesChat;
  }

  async getMessage(id: string) {
    const chat = await this.bd__chat.findOne({
      where: { MessageId: id },
      relations: { FromId: true },
    });

    return chat;
  }
}
