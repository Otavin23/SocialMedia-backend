import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';
import { genSaltSync, hashSync } from 'bcrypt';

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
    const find = await this.bd_user.findOneBy(user);

    return find;
  }
}

export { UserService };
