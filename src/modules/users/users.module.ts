import { Module } from '@nestjs/common';
import { CreateUserUserCase } from './userCase/create-user.useCase';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  controllers: [],
  providers: [CreateUserUserCase, PrismaService],
})
export class UsersModule {}
