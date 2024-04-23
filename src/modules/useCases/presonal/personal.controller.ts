import { Controller, Put, Req, Res } from '@nestjs/common';
import { PersonalServices } from './personal.service';
import { Request, Response } from 'express';

@Controller('personal')
class PersonalController {
  constructor(private personalServices: PersonalServices) {}

  @Put('information/basic')
  async changeInformationPersonal(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { id, name, subTitle, city, country, blog } = request.body;
    const data = {
      id,
      name,
      subTitle,
      city,
      country,
      blog,
    };

    const changeInformationPersonal =
      await this.personalServices.changeInformationPresonal(data);

    return response.status(200).json(changeInformationPersonal);
  }
}

export { PersonalController };
