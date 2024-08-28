import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateUserUseCase } from './userCase/create-user.useCase';

import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './userCase/profile-user.usecase';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly userCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  // @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.userCase.execute(data);

    return CreateUserResponseSchemaDTO.safeParse(user);
  }
  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.sub);
  }
}
