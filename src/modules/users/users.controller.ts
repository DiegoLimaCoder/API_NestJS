import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';

import { CreateUserUseCase } from './userCase/create-user.useCase';

import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './userCase/profile-user.usecase';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dtos/user.dto';
import { UploadAvatarUserUseCase } from './userCase/upload-avatar-user.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly userCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
  ) {}

  @Post()
  // @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.userCase.execute(data);

    return CreateUserResponseSchemaDTO.parse(user);
  }
  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.sub);
  }

  @Put('/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
    const result = await this.uploadAvatarUserUseCase.execute({
      file,
      idUser: req.user.sub,
    });
    return result;
  }
}
