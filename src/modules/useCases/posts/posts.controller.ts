import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { postsService } from './posts.service';

@Controller('posts')
class postsController {
  constructor(private postsServices: postsService) {}

  @Get('list')
  async listPostsAndProjects(@Res() response: Response) {
    const filterPosts = await this.postsServices.listPosts();

    return response.status(200).json(filterPosts);
  }
}

export { postsController };
