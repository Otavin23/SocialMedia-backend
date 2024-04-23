import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';

@Injectable()
export class ServiceFriendsService {
  private bd_user = AppDataSource.getRepository(User);

  async listFriends(id: string) {
    const user = await this.bd_user.findOne({ where: { id } });

    return user.followers;
  }
}
