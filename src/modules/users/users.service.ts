import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async execute({ name, email, password, username }: CreateUserDto) {
    const userAlreadyExist = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userAlreadyExist) {
      throw new Error('User already exists!');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });

    return user;
  }
}
