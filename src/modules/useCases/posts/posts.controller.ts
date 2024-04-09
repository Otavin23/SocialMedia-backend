import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { postsService } from './posts.service';

@Controller('posts')
class postsController {
  constructor(private postsServices: postsService) {}

  @Get('list')
  async listPostsAndProjects(@Res() response: Response) {
    const filterPosts = await this.postsServices.listPosts();

    return response.status(200).json(filterPosts);
  }

  @Get('list/:id')
  async listPosterUser(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;

    const listPostsUser = await this.postsServices.listAllPostsUser(id);

    return response.status(200).json(listPostsUser);
  }

  @Post('/add/comment')
  async commentsAdd(@Req() request: Request, @Res() response: Response) {
    const { description, id, user__id } = request.body;

    const publicationComment = await this.postsServices.commentsAdd(
      id,
      description,
      user__id,
    );

    return response.status(200).json(publicationComment);
  }

  // @Post('add/subComments')
  // async subComment(@Req() request: Request, @Res() response: Response) {
  //   const { user__id, id, publication__id, description } = request.body;

  //   const republication = await this.postsServices.subCommentAdd(
  //     user__id,
  //     id,
  //     publication__id,
  //     description,
  //   );

  //   return response.status(200).json(republication);
  // }
}

export { postsController };
