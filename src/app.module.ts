import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
