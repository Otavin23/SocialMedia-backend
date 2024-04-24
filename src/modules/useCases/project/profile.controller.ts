import { ProfileService } from './profile.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

@Controller('profile')
class ProfileController {
  constructor(private ProfileServices: ProfileService) {}

  @Post('/create/project')
  @UseInterceptors(FileInterceptor('media'))
  async createProject(
    @Req() request: Request,
    @UploadedFile() media,
    @Res() response: Response,
  ) {
    const { id, name, description } = request.body;
    const { mimetype } = request.file;

    const b64 = Buffer.from(request.file.buffer).toString('base64');
    const pathImage = 'data:' + mimetype + ';base64,' + b64;

    const projectList = await this.ProfileServices.createProject(
      id,
      name,
      description,
      pathImage,
    );

    return response.status(200).json(projectList);
  }

  @Delete('/remove/project/:id')
  async removeProject(@Param('id') id: string, @Res() response: Response) {
    const projectRemove = await this.ProfileServices.removeProject(id);

    return response.status(200).json(projectRemove);
  }

  @Get('/lists/projects/:id')
  async listsProjects(@Param('id') id: string, @Res() response: Response) {
    const listsProjects = await this.ProfileServices.listsProjects(id);

    return response.status(200).json(listsProjects);
  }
}

export { ProfileController };
