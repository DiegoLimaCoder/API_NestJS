import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './userCase/create-user.useCase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UsersController } from './users.controller';
import { IUserRepository } from './repositories/user.repositories';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UsersModule {}
