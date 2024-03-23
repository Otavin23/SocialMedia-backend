import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IExperience } from 'src/entity/@types/experience';
import { ExperienceService } from './experience.service';

@Controller('experience')
class ExperienceController {
  constructor(private ExperienceServices: ExperienceService) {}

  @Post('create')
  async createExperience(@Req() request: Request, @Res() response: Response) {
    const {
      id,
      nameCompany,
      locality,
      typeJob,
      initialMonth,
      initialYear,
      description,
      finishMonth,
      finishYear,
    } = request.body;

    const experience: IExperience = {
      companyName: nameCompany,
      locality: locality,
      jobType: typeJob,
      initialJob: {
        month: initialMonth,
        year: initialYear,
      },
      finishJob: {
        month: finishMonth,
        year: finishYear,
      },

      description: description,
      image:
        'https://marketplace.canva.com/EAF2TsQ9aEw/3/0/1600w/canva-logotipo-para-empresa-de-tecnologia-simples-azul-preto-tKicS0QzhNU.jpg',
    };

    const experiences = await this.ExperienceServices.createExperience(
      experience,
      id,
    );

    return response.status(200).json(experiences);
  }
}

export { ExperienceController };
