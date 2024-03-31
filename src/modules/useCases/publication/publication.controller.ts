import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('publication')
class PublicationsController {
  constructor(private PublicationServices: PublicationService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('media'))
  async publicationCreate(
    @Req() request: Request,
    @UploadedFile() media,
    @Res() response: Response,
  ) {
    const { description, id } = request.body;

    const { mimetype } = request.file;

    const b64 = Buffer.from(request.file.buffer).toString('base64');
    const pathImage = 'data:' + mimetype + ';base64,' + b64;

    const createPublication = await this.PublicationServices.createPublication(
      description,
      id,
      pathImage,
    );

    return response.status(200).json(createPublication);
  }
}
export { PublicationsController };
