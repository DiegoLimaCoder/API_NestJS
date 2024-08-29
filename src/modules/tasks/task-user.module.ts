import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ITaskUserRepository } from './repositories/task-user.repository';
import { TaskUserPrismaRepository } from './repositories/prisma/task-user.prisma.repository';
import { CreateTaskUserUseCase } from './useCase/create-task.usercase';
import { TaskUserController } from './task-user.controller';

@Module({
  controllers: [TaskUserController],
  providers: [
    PrismaService,
    CreateTaskUserUseCase,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
})
export class TaskUserModule {}
