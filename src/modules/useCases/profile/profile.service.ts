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

  async createProject(id: string, name: string, description: string) {
    const user = await this.bd_user.findOneBy({ id });

    const projects = {
      name,
      description,
      image: '',
      craeted_at: new Date(),
    };

    user.projects.push(projects);

    await this.bd_user.save(user);
  }
}

export { ProfileService };
