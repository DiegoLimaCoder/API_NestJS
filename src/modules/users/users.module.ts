import { Module } from '@nestjs/common';
import { CreateUserUserCase } from './userCase/create-user.useCase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [CreateUserUserCase, PrismaService],
})
export class UsersModule {}
