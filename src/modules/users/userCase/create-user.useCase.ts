import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class CreateUserUserCase {
  constructor(private prisma: PrismaService) {}

  async execute({ name, email, password, username }: CreateUserDto) {
    const userAlreadyExist = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userAlreadyExist) {
      throw new HttpException('users already exist!', HttpStatus.BAD_REQUEST);
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
