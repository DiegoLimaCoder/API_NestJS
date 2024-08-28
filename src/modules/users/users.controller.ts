import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserDTO } from './dtos/user.dto';
import { CreateUserUseCase } from './userCase/create-user.useCase';
import { CreateUserValidationPipe } from './pipes/create-user.validation.pipe';

@Controller('/users')
export class UsersController {
  constructor(private readonly userCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this.userCase.execute(data);
  }
}
