import { Module } from '@nestjs/common';
import { postsController } from './posts.controller';
import { postsService } from './posts.service';

@Module({
  controllers: [postsController],
  providers: [postsService],
})
export class postsModule {}
