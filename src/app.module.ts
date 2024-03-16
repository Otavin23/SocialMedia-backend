import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/useCases/user/app.module';
import { ProfileModule } from './modules/useCases/profile/profile.module';
import { EnsureAuthenticatedMiddleware } from './middlewares/ensureAuthenticated';

@Module({
  imports: [UserModule, ProfileModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticatedMiddleware)
      .forRoutes({ path: 'user/me/verify', method: RequestMethod.GET });
  }
}
