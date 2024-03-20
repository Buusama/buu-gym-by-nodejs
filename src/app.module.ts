import { Module } from '@nestjs/common';
import applicationProvider from './providers';
import applicationModular from './modules';
import { UserSubscriber } from 'src/subcribers/user-subcriber.subcriber';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from 'src/interceptors/user-interceptor.interceptor';
import { TrimValueInterceptor } from './interceptors/trim-value.interceptor';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';

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
export class AppModule { }
