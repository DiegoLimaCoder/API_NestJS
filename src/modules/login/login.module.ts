import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { SignInUseCase } from './useCase/sign-in.useCase';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from '../users/repositories/user.repositories';
import { UserPrismaRepository } from '../users/repositories/prisma/user.prisma.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'App_Todo',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    SignInUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class LoginModule {}
