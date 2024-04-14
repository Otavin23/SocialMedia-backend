import { Controller, Res, Req, Post, Get, Param } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { Request, Response } from 'express';

@Controller('message')
export class AppController {
  constructor(private readonly appService: MessageGateway) {}

  // @Post('/create')
  // async createMessage(@Req() request: Request, @Res() response: Response) {
  //   const { id } = request.body;

  //   // console.log(id);
  //   // const message = await this.appService.emitMessage(id);

  //   // return response.status(200).json(message);
  // }

  // @Post('/receivMessage')
  // async receiveMessage(@Req() request: Request, @Res() response: Response) {
  //   const { id, id__chat } = request.body;

  //   // const chat = await this.appService.emmitMessageDefault(id, id__chat);

  //   // return response.status(200).json(chat);
  // }

  @Get('/list/:id')
  async ChatList(@Param('id') id: string, @Res() response: Response) {
    const messageGet = await this.appService.getMessage(id);

    return response.status(200).json(messageGet);
  }

  @Get('/list/chat/:id')
  async Chat(@Param('id') id: string, @Res() response: Response) {
    const messages = await this.appService.listMessages(id);

    return response.status(200).json(messages);
  }
}
