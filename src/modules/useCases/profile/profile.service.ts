import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';

@Injectable()
class ProfileService {
  private bd_user = AppDataSource.getRepository(User);

  async descriptionEdit(id: string, description: string) {
    const user = await this.bd_user.findOneBy({ id });

    user.description = description;

    await this.bd_user.save(user);

    return user;
  }
}

export { ProfileService };
