import { TaskUserRequestDTO, TaskUserResponseDTO } from '../dtos/user.dto';

export abstract class ITaskUserRepository {
  abstract save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO>;
}
