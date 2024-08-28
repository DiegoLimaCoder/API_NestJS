import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
