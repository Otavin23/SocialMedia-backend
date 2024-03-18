import { ProfileService } from './profile.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('profile')
class ProfileController {
  constructor(private ProfileServices: ProfileService) {}

  @Post('/description')
  async descriptionEdit(@Req() request: Request, @Res() response: Response) {
    const { id, description } = request.body;

    const EditDescription = await this.ProfileServices.descriptionEdit(
      id,
      description,
    );

    return response.status(200).json(EditDescription);
  }

  @Post('/create/project')
  async createProject(@Req() request: Request, @Res() response: Response) {
    const { id, name, description } = request.body;

    const projectList = await this.ProfileServices.createProject(
      id,
      name,
      description,
    );

    return response.status(200).json(projectList);
  }
}

export { ProfileController };
