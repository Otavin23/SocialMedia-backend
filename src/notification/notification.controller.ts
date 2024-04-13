import { Controller, Post, Get, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { NotificationGateway } from './notification.gateway';

@Controller('notifications')
class NotificationController {
  constructor(private notificationGateway: NotificationGateway) {}

  @Post('create')
  // @UseGuards()
  async isVerifield(@Req() request: Request, @Res() response: Response) {
    const { id } = request.body;
    const notify = await this.notificationGateway.emitNotification(id);

    return response.status(200).json({
      text: 'hello',
      body: notify,
    });
  }

  @Get('list/:id')
  async listNotifications(@Param('id') id: string, @Res() response: Response) {}
}

export { NotificationController };
