import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './app.service';

import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

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
      return response.status(404).json({ message: 'User does not exist' });

    const checkPassword = compareSync(password, find.password);

    if (!checkPassword)
      return response
        .status(401)
        .json({ message: 'and username or password are incorrect' });

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

  @Get('me/verify')
  async verifyToken(@Res() response: Response) {
    const { userId } = response.locals;
    return response.status(200).json({
      sucess: true,
      data: userId,
    });
  }
}

export { UserController };
