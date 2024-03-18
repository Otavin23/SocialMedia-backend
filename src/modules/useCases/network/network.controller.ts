import { Controller, Post, Req, Res, Get, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { NetworkService } from './network.service';
import { request } from 'http';

@Controller('network')
class NetworkProfile {
  constructor(private NetworkServices: NetworkService) {}

  @Post('invite')
  async inviteNetwork(@Req() request: Request, @Res() response: Response) {
    const { user__id, id } = request.body;

    const userNetwork = await this.NetworkServices.networkInvite(user__id, id);

    return response.status(200).json(userNetwork);
  }

  @Get('list/invite/:id')
  async listInvites(@Param('id') id: string, @Res() response: Response) {
    const listInvite = await this.NetworkServices.NetworkListInvites(id);

    return response.status(200).json(listInvite);
  }

  @Post('/invite/accept')
  async inviteAccept(@Req() request: Request, @Res() response: Response) {
    const { id, user__id } = request.body;

    const inviteAccept = await this.NetworkServices.inviteAccept(user__id, id);

    return response.status(200).json(inviteAccept);
  }

  @Post('/invite/decline')
  async declineInvite(@Req() request: Request, @Res() response: Response) {
    const { id, user__id } = request.body;

    const inviteAccept = await this.NetworkServices.declineAccept(user__id, id);

    return response.status(200).json(inviteAccept);
  }
}

export { NetworkProfile };
