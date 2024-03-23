import { Controller, Post, Req, Res } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { Request, Response } from 'express';

@Controller('publication')
class PublicationsController {
  constructor(private PublicationServices: PublicationService) {}

  @Post('create')
  async publicationCreate(@Req() request: Request, @Res() response: Response) {
    const { description, id } = request.body;

    const createPublication = await this.PublicationServices.createPublication(
      description,
      id,
    );

    return response.status(200).json(createPublication);
  }
}
export { PublicationsController };
