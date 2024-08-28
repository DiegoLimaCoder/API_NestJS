import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { SignInUseCase } from './useCase/sign-in.useCase';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'App_Todo',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [LoginController],
  providers: [SignInUseCase, PrismaService],
})
export class LoginModule {}
