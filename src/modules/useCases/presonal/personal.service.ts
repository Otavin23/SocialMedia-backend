import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { User } from 'src/entity/User';

interface IChangeInformationPresonal {
  id: string;
  name: string;
  subTitle: string;
  city: string;
  country: string;
  blog: string;
}

@Injectable()
class PersonalServices {
  private bd__user = AppDataSource.getRepository(User);

  async changeInformationPresonal(data: IChangeInformationPresonal) {
    await this.bd__user.update({ id: data.id }, data);
  }
}

export { PersonalServices };
