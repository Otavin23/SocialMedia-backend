import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';
import { v2 as cloudinary } from 'cloudinary';
import { Publications } from 'src/entity/Publications';
import { Comments } from 'src/entity/Comments';
import { IHeart } from 'src/entity/heart';

@Injectable()
class PublicationService {
  private bd_user = AppDataSource.getRepository(User);
  private bd__publication = AppDataSource.getRepository(Publications);
  private bd__comments = AppDataSource.getRepository(Comments);
  private bd__hearts = AppDataSource.getRepository(IHeart);

  async createPublication(description: string, id: string, pathName?: string) {
    const user = await this.bd_user.findOne({
      where: { id },
      relations: { publication: true },
    });

    let uploadImage = undefined;

    if (pathName) {
      const imageUpload = await cloudinary.uploader.upload(pathName, {
        folder: 'avatars',
        resource_type: 'image',
        format: 'svg',
        allowed_formats: ['jpg', 'webp', 'png', 'mp4', 'mkv'],
      });

      uploadImage = imageUpload.url;
    }

    const publication = this.bd__publication.create({
      description,
      comments: [],
      like: 0,
      image: uploadImage ?? '',
    });

    user.publication.push(publication);

    await this.bd__publication.save(publication);
    await this.bd_user.save(user);

    return user;
  }

  async deletePublication(id: string) {
    const deleteUser = await this.bd__publication.delete({ id });

    return deleteUser;
  }

  async deleteMessage(id: string) {
    this.bd__comments.delete({ id });
  }

  async addHeart(id__publication: string, id__user: string) {
    const publication = await this.bd__publication.findOne({
      where: {
        id: id__publication,
      },
      relations: { heart: true },
    });

    const findHeart = publication.heart.find(
      (heart) => heart.user.id === id__user,
    );

    if (findHeart) throw new Error();

    const user = await this.bd_user.findOneBy({ id: id__user });

    const heartUser = this.bd__hearts.create({
      user: {
        id: user.id,
        avatar: user.avatar,
        description: user.description,
        name: user.name,
      },
    });

    publication.heart.push(heartUser);
    await this.bd__hearts.save(heartUser);
    await this.bd__publication.save(publication);

    return publication;
  }

  async removeHeart(id__publication: string, id__user: string) {
    const hearts = await this.bd__publication.findOne({
      where: { id: id__publication },
      relations: { heart: true },
    });

    const findHeartsId = hearts.heart.find(
      (heart) => heart.user.id === id__user,
    );

    await this.bd__hearts.delete({ id: findHeartsId.id });
  }
}

export { PublicationService };
