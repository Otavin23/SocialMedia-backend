import { Controller, Param, Get, Res } from '@nestjs/common';
import { ServiceFriendsService } from './friends.service';
import { Response } from 'express';

@Controller('friends')
export class FriendsController {
  constructor(private friendsServices: ServiceFriendsService) {}

  @Get('list/:id')
  async listFriends(@Param('id') id: string, @Res() response: Response) {
    const listFriends = await this.friendsServices.listFriends(id);

    return response.status(200).json(listFriends);
  }
}
