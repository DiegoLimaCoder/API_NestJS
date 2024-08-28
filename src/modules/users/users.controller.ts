import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { CreateUserUserCase } from './userCase/create-user.useCase';
import { CreateUserValidationPipe } from './pipes/create-user.validation.pipe';

@Controller('/users')
export class UsersController {
  constructor(private readonly userCase: CreateUserUserCase) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDto) {
    return await this.userCase.execute(data);
  }
}
