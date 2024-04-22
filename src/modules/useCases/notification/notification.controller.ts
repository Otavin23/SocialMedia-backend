import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NotificationService } from './notification.service';

@Controller('notifications')
class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('create')
  async isVerifield(@Req() request: Request, @Res() response: Response) {
    const { id, user__id, enumType, id__publication, text } = request.body;
    const notify = await this.notificationService.create(
      id,
      user__id,
      enumType,
      id__publication,
      text,
    );

    return response.status(200).json(notify);
  }

  @Get('list/:id')
  async listNotifications(@Param('id') id: string, @Res() response: Response) {
    const listNotifications =
      await this.notificationService.listNotification(id);

    return response.status(200).json(listNotifications);
  }

  @Delete('delete/:id')
  async deleteNotifications(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const deleteNotification =
      await this.notificationService.deleteNotifications(id);

    return response.status(200).json(deleteNotification);
  }

  @Put('read/mark/:id')
  async readNotifications(@Param('id') id: string, @Res() response: Response) {
    const readNotifications =
      await this.notificationService.readNotification(id);

    return response.status(200).json(readNotifications);
  }
}

export { NotificationController };
