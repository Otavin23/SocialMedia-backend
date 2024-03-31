import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';
import { v2 as cloudinary } from 'cloudinary';
import { Publications } from 'src/entity/Publications';

@Injectable()
class PublicationService {
  private bd_user = AppDataSource.getRepository(User);
  private bd__publication = AppDataSource.getRepository(Publications);

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

      console.log(imageUpload);

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
}

export { PublicationService };
