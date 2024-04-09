import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { Projects } from 'src/entity/Project';
import { Publications } from 'src/entity/Publications';

@Injectable()
class FeedServices {
  private bd__publication = AppDataSource.getRepository(Publications);
  private bd__projects = AppDataSource.getRepository(Projects);

  async findUnicFeed(id: any) {
    const publication = await this.bd__publication.findOne({
      where: { id },
      order: { comments: { created_at: 'DESC' } },
      relations: {
        user: true,
        comments: true,
      },
    });

    const projects = await this.bd__projects.findOne({
      where: { id },
      relations: { user: true },
    });

    return publication || projects;
  }
}

export { FeedServices };
