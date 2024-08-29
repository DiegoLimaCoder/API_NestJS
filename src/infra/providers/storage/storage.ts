import { FileDTO } from 'src/modules/users/dtos/user.dto';

export abstract class IStorage {
  abstract upload(file: FileDTO, folder: string): Promise<any>;
}
