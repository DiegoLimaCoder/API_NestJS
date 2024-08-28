import {
  Body,
  Controller,
  Post,
  UsePipes,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/user.dto';
import { CreateUserUseCase } from './userCase/create-user.useCase';
import { CreateUserValidationPipe } from './pipes/create-user.validation.pipe';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './userCase/profile-user.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly userCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this.userCase.execute(data);
  }
  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.sub);
  }
}
