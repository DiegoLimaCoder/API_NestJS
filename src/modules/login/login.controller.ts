import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from '../login/dtos/sign-in.dto';
import { SignInUseCase } from './useCase/sign-in.useCase';

@Controller()
export class LoginController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  @Post('/sign-in')
  async sigIn(@Body() data: SignInDTO) {
    const token = await this.signInUseCase.execute(data);
    return token;
  }
}
