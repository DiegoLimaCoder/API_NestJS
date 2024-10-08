import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IUserRepository } from 'src/modules/users/repositories/user.repositories';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: IUserRepository,
  ) {}
  async execute(data: SignInDTO) {
    const user = await this.userRepository.findByUsername(data.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const password = await compare(data.password, user.password);

    if (!password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
