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

@Module({
  imports: [UserModule, ProfileModule, NetworkModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticatedMiddleware)
      .forRoutes({ path: 'user/me/verify', method: RequestMethod.GET });
  }
}
