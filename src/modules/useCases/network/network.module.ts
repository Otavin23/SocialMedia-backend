import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NetworkProfile } from './network.controller';
import { NetworkService } from './network.service';
import { EnsureAuthenticatedMiddleware } from 'src/middlewares/ensureAuthenticated';

@Module({
  controllers: [NetworkProfile],
  providers: [NetworkService],
})
export class NetworkModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticatedMiddleware)
      .forRoutes({ path: 'network/list', method: RequestMethod.GET });
  }
}
