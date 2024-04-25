import {
  Controller,
  Post,
  Req,
  Res,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
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
    let pathname;
    if (media) {
      const { mimetype } = request.file;
      const b64 = Buffer.from(request.file.buffer).toString('base64');
      const pathImage = 'data:' + mimetype + ';base64,' + b64;
      pathname = pathImage;
    }

    const createPublication = await this.PublicationServices.createPublication(
      description,
      id,
      pathname,
    );

    return response.status(200).json(createPublication);
  }

  @Delete('delete/:id')
  async deletePublication(@Param('id') id: string, @Res() response: Response) {
    const deleteUser = await this.PublicationServices.deletePublication(id);

    return response.status(200).json(deleteUser);
  }

  @Delete('delete/message/:id')
  async deleteMessage(@Param('id') id: string, @Res() response: Response) {
    const deleteMessage = await this.PublicationServices.deleteMessage(id);

    return response.status(200).json(deleteMessage);
  }

  @Post('addHeart')
  async addHeart(@Req() request: Request, @Res() response: Response) {
    try {
      const { id__publication, id__user } = request.body;

      const addHeart = await this.PublicationServices.addHeart(
        id__publication,
        id__user,
      );

      return response.status(200).json(addHeart);
    } catch (error) {
      return response.status(400).json({
        error: error,
      });
    }
  }

  @Post('removeHeart')
  async removeHeard(@Req() request: Request, @Res() response: Response) {
    const { id__publication, id__user } = request.body;

    const removeHeart = await this.PublicationServices.removeHeart(
      id__publication,
      id__user,
    );

    return response.status(200).json(removeHeart);
  }
}
export { PublicationsController };
