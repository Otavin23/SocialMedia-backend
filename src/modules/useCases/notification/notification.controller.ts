import { Controller, Post, Get, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { NotificationService } from './notification.service';

@Controller('notifications')
class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('create')
  async isVerifield(@Req() request: Request, @Res() response: Response) {
    const { id, user__id, enumType } = request.body;
    const notify = await this.notificationService.create(
      id,
      user__id,
      enumType,
    );

    return response.status(200).json(notify);
  }

  @Get('list/:id')
  async listNotifications(@Param('id') id: string, @Res() response: Response) {
    const listNotifications =
      await this.notificationService.listNotification(id);

    return response.status(200).json(listNotifications);
  }
}

export { NotificationController };
