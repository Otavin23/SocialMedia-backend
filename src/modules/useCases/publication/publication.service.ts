import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';

@Injectable()
class PublicationService {
  private bd_user = AppDataSource.getRepository(User);

  async createPublication(description: string, id: string) {
    const user = await this.bd_user.findOneBy({ id });

    user.publication.push({
      description,
      comments: [],
      heart: 0,
      like: 0,
      image:
        'https://empreender.com.br/wp-content/uploads/2022/11/como-criar-uma-estrutura-de-landing-page-scaled.jpg',
    });

    await this.bd_user.save(user);
    return user;
  }
}

export { PublicationService };
