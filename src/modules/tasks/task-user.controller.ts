import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { CreateTaskUserUseCase } from './useCase/create-task.usercase';
import { CreateTaskUserSchemaDTO } from './schemas/task-user.schema';

@Controller('/tasks')
export class TaskUserController {
  constructor(private taskUserUseCase: CreateTaskUserUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateTaskUserSchemaDTO, @Request() req) {
    return this.taskUserUseCase.execute({
      ...data,
      userId: req.user.sub,
    });
  }
}
