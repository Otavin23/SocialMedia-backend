import { Controller, Get, Res, Req } from '@nestjs/common';
import { FeedServices } from './feed.service';
import { Response, Request } from 'express';

@Controller('feed')
class FeedController {
  constructor(private FeedService: FeedServices) {}

  @Get('/list/:id')
  async listUnicFeed(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;

    const feed = await this.FeedService.findUnicFeed(id);

    return response.status(200).json(feed);
  }
}

export { FeedController };
