import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { Comments } from 'src/entity/Comments';
import { Projects } from 'src/entity/Project';
import { Publications } from 'src/entity/Publications';
import { User } from 'src/entity/User';

@Injectable()
class postsService {
  private bd__publication = AppDataSource.getRepository(Publications);
  private bd__projects = AppDataSource.getRepository(Projects);
  private bd__user = AppDataSource.getRepository(User);
  private bd__comments = AppDataSource.getRepository(Comments);
  // private bd__subComment = AppDataSource.getRepository(subComment);

  async listPosts() {
    const publication = await this.bd__publication.find({
      order: {
        craeted_at: 'DESC',
      },
      relations: {
        user: true,
        heart: true,
        comments: true,
      },
    });

    return publication;
  }

  async commentsAdd(id: string, description: string, user__id: string) {
    const publication = await this.bd__publication.findOne({
      where: { id },
      relations: { comments: true },
    });

    const user = await this.bd__user.findOneBy({ id: user__id });

    const comment = this.bd__comments.create({
      description,
      user: { avatar: user.avatar, name: user.name },
    });

    publication.comments.push(comment);

    await this.bd__comments.save(comment);
    await this.bd__publication.save(publication);

    return publication;
  }

  async listAllPostsUser(id: string) {
    const posts = await this.bd__user.findOne({
      where: { id },
      // order: { publication: { comments: 'DESC' } },
      order: { publication: { comments: { created_at: 'DESC' } } },
      relations: {
        publication: { user: true, comments: true, heart: true },
        projects: { user: true },
      },
    });

    const user = await this.bd__user.findOneBy({ id });

    const post = {
      user: user,
      posts: posts.publication,
    };

    return post;
  }
}

export { postsService };
