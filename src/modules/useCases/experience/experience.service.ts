import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/database/data-source';
import { IExperience } from 'src/entity/@types/experience';
import { User } from 'src/entity/User';

@Injectable()
class ExperienceService {
  private bd_user = AppDataSource.getRepository(User);

  async createExperience(experience: IExperience, id: string) {
    const user = await this.bd_user.findOneBy({ id });

    user.experiences.push(experience);

    await this.bd_user.save(user);
    return user;
  }
}

export { ExperienceService };
