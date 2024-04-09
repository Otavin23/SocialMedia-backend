import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedServices } from './feed.service';

@Module({
  controllers: [FeedController],
  providers: [FeedServices],
})
export class FeedModule {}
