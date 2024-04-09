import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';
import { v2 as cloudinary } from 'cloudinary';
import { Publications } from 'src/entity/Publications';
import { Comments } from 'src/entity/Comments';

@Injectable()
class PublicationService {
  private bd_user = AppDataSource.getRepository(User);
  private bd__publication = AppDataSource.getRepository(Publications);
  private bd__comments = AppDataSource.getRepository(Comments);

  async createPublication(description: string, id: string, pathName?: string) {
    const user = await this.bd_user.findOne({
      where: { id },
      relations: { publication: true },
    });

    let uploadImage = undefined;

    if (pathName) {
      const imageUpload = await cloudinary.uploader.upload(pathName, {
        public_id: 'olimpic',
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
      heart: 0,
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

  async addHeart() {}
}

export { PublicationService };
