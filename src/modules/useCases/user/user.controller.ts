import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './app.service';

import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
class UserController {
  constructor(private UserServices: UserService) {}

  @Post('signup')
  async signUp(@Req() request: Request, @Res() response: Response) {
    const { name, email, password } = request.body;

    const find = await this.UserServices.findUser({ email });

    if (find) {
      return response.status(401).json({
        error: 'user alredy exits',
      });
    }

    const user = await this.UserServices.createUser({ name, email, password });

    return response.status(201).json(user);
  }

  @Post('signin')
  async signIn(@Req() request: Request, @Res() response: Response) {
    const { email, password } = request.body;

    const find = await this.UserServices.findUser({ email });

    if (!find)
      return response
        .status(404)
        .json({ message: 'email or password are incorrect' });

    const checkPassword = compareSync(password, find.password);

    if (!checkPassword)
      return response
        .status(401)
        .json({ message: 'email or password are incorrect' });

    const token = sign(
      {
        id: find.id,
        name: find.name,
        email: find.email,
        image: find.avatar,
      },
      process.env.TOKEN,
    );

    return response.status(200).json(token);
  }

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadImage(
    @Req() request: Request,
    @UploadedFile() avatar,
    @Res() response: Response,
  ) {
    const { userId } = request.body;
    const { mimetype } = request.file;

    const b64 = Buffer.from(request.file.buffer).toString('base64');

    const pathImage = 'data:' + mimetype + ';base64,' + b64;

    const uploadImageAvatar = await this.UserServices.imageUpload(
      userId,
      pathImage,
      'avatar',
    );

    return response.status(200).json(uploadImageAvatar);
  }

  @Post('upload/background/image')
  @UseInterceptors(FileInterceptor('background'))
  async uploadImageBackground(
    @Req() request: Request,
    @UploadedFile() background,
    @Res() response: Response,
  ) {
    const { userId } = request.body;
    const { mimetype } = request.file;

    const b64 = Buffer.from(request.file.buffer).toString('base64');

    const pathImage = 'data:' + mimetype + ';base64,' + b64;

    const uploadImageBackground = await this.UserServices.imageUpload(
      userId,
      pathImage,
      'background',
    );

    return response.status(200).json(uploadImageBackground);
  }

  @Get('me/verify')
  async verifyToken(@Res() response: Response) {
    const { userId } = response.locals;
    return response.status(200).json({
      sucess: true,
      data: userId,
    });
  }

  @Get('profile/:id')
  async getProfileUser(@Param('id') id: string, @Res() response: Response) {
    const user = await this.UserServices.findUser({ id });

    if (!user) {
      return response.status(400).json({ messge: 'User not found' });
    }

    return response.status(200).json(user);
  }

  @Put('profile/description')
  async DescriptionEdit(@Req() request: Request, @Res() response: Response) {
    const { id, description } = request.body;
    const descriptionEdit = await this.UserServices.EditDescriptionUser(
      id,
      description,
    );

    return response.status(200).json(descriptionEdit);
  }
}

export { UserController };
