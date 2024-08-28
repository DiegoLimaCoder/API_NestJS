import { Injectable, Logger } from '@nestjs/common';
import { TaskUserRequestDTO } from '../dtos/user.dto';
import { ITaskUserRepository } from '../repositories/task-user.repository';

@Injectable()
export class CreateTaskUserUseCase {
  private readonly logger = new Logger(CreateTaskUserUseCase.name);

  constructor(private taskUserRepository: ITaskUserRepository) {}

  async execute(data: TaskUserRequestDTO) {
    return this.taskUserRepository.save(data);
  }
}
