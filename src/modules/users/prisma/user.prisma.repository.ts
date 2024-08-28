// src/modules/user/services/user.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { hash } from 'bcrypt';
import { IUserRepository } from '../prisma/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password, username }: CreateUserDto) {
    const userAlreadyExist = await this.userRepository.findByUsernameOrEmail({
      username,
      email,
    });
    if (userAlreadyExist) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await hash(password, 10);

    return await this.userRepository.save({
      name,
      username,
      email,
      password: passwordHash,
    });
  }
}
