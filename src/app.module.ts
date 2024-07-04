import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './interceptors/user-interceptor.interceptor';
import { UserSubscriber } from './subcribers/user-subcriber.subcriber';
import { TrimValueInterceptor } from './interceptors/trim-value.interceptor';
import applicationModular from './modules';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';
import applicationProvider from './providers';

@Module({
  imports: [
    ...applicationModular.register(),
    ...applicationProvider.register(),
  ],
  controllers: [],
  providers: [
    UserSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TrimValueInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
