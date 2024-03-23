import { Module } from '@nestjs/common';
import { PublicationsController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationService],
})
export class PublicationModule {}
