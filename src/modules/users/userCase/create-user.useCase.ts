import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { hash } from 'bcrypt';
import { IUserRepository } from '../prisma/repositories/user.repository';
@Injectable()
export class CreateUserUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDto) {
    const user = await this.userRepository.findByUsernameOrEmail(data);

    if (user) {
      throw new HttpException('users already exist!', HttpStatus.BAD_REQUEST);
    }
    const password = await hash(user.password, 10);

    return await this.userRepository.save({
      ...data,
      password,
    });
  }
}
