import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { Projects } from 'src/entity/Project';
import { User } from 'src/entity/User';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
class ProfileService {
  private bd_user = AppDataSource.getRepository(Projects);
  private bd_user2 = AppDataSource.getRepository(User);

  async createProject(
    id: string,
    name: string,
    description: string,
    pathName: any,
  ) {
    const userFind = await this.bd_user2.findOne({
      where: {
        id,
      },
      relations: {
        projects: true,
      },
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

    const projeto = this.bd_user.create({
      description,
      name,
      image: uploadImage ?? '',
    });

    userFind.projects.push(projeto);

    await this.bd_user.save(projeto);
    await this.bd_user2.save(userFind);

    return userFind;
  }

  async removeProject(id: string) {
    await this.bd_user.delete({ id });
  }

  async listsProjects(id: string) {
    const projects = await this.bd_user2.findOne({
      where: { id },
      relations: { projects: true },
    });
    return projects.projects;
  }
}

export { ProfileService };
