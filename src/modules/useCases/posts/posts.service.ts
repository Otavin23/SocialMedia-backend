import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { Projects } from 'src/entity/Project';
import { Publications } from 'src/entity/Publications';

@Injectable()
class postsService {
  private bd__publication = AppDataSource.getRepository(Publications);
  private bd__projects = AppDataSource.getRepository(Projects);

  async listPosts() {
    const publication = await this.bd__publication.find({
      order: {
        craeted_at: 'DESC',
      },
    });

    const projects = await this.bd__projects.find({
      order: {
        created_at: 'DESC',
      },
    });

    return [...publication, ...projects];
  }
}

export { postsService };
