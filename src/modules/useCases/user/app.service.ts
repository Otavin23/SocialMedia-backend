import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';
import { genSaltSync, hashSync } from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';

interface IFInd {
  name?: string;
  email?: string;
  id?: string;
}

@Injectable()
class UserService {
  private bd_user = AppDataSource.getRepository(User);

  async createUser({ name, email, password }) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    const user = this.bd_user.create({
      name,
      email,
      password: hash,
    });

    await this.bd_user.save(user);

    return user;
  }

  async findUser(user: IFInd) {
    const find = await this.bd_user.find({
      where: user,
      relations: {
        projects: {
          user: true,
        },

        publication: {
          user: true,
          comments: true,
        },

        messagesChat: {
          FromId: true,
        },
      },
    });

    return find[0];
  }

  async imageUpload(id: string, image: string, inType: string) {
    const user = await this.bd_user.findOneBy({ id });

    const imageUpload = await cloudinary.uploader.upload(image, {
      public_id: 'olimpic',
      folder: 'avatars',
      resource_type: 'image',
      format: 'svg',
      allowed_formats: ['jpg', 'webp', 'png'],
    });

    user[inType] = imageUpload.url;

    await this.bd_user.save(user);
    return user;
  }
}

export { UserService };
