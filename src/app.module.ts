import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from './modules/tasks/task-user.module';

@Module({
  imports: [UsersModule, LoginModule, TaskUserModule],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
