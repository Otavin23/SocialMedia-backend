import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { Projects } from 'src/entity/Project';
import { User } from 'src/entity/User';

@Injectable()
class ProfileService {
  private bd_user = AppDataSource.getRepository(Projects);
  private bd_user2 = AppDataSource.getRepository(User);

  // async descriptionEdit(id: string, description: string) {
  //   // const user = await this.bd_user.findOneBy({ id });
  //   // user.description = description;
  //   // await this.bd_user.save(user);
  //   // return user;
  // }

  async createProject(id: string, name: string, description: string) {
    const userFind = await this.bd_user2.findOne({
      where: {
        id,
      },
      relations: {
        projects: true,
      },
    });

    const projeto = this.bd_user.create({
      description,
      like: '0',
      comments: [],
      heart: '0',
      user: userFind,
      media: '0',
    });

    userFind.projects.push(projeto);

    await this.bd_user.save(projeto);
    await this.bd_user2.save(userFind);

    return userFind;
  }
}

export { ProfileService };
