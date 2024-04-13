import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/useCases/user/app.module';
import { ProfileModule } from './modules/useCases/profile/profile.module';
import { EnsureAuthenticatedMiddleware } from './middlewares/ensureAuthenticated';
import { NetworkModule } from './modules/useCases/network/network.module';
import { PublicationModule } from './modules/useCases/publication/publication.module';
import { ExperienceModule } from './modules/useCases/experience/experience.module';
import { postsModule } from './modules/useCases/posts/posts.module';
import { FeedModule } from './modules/useCases/feed/feed.module';
import { SocketModule } from './modules/useCases/notification/notification.module';
import { AppService } from './message/message.service';
import { SocketModuleMessage } from './message/message.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    NetworkModule,
    PublicationModule,
    ExperienceModule,
    postsModule,
    FeedModule,
    SocketModule,
    SocketModuleMessage,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticatedMiddleware)
      .forRoutes({ path: 'user/me/verify', method: RequestMethod.GET });
  }
}
