import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repositories';

@Injectable()
export class ProfileUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    return this.userRepository.findById(id);
  }
}
