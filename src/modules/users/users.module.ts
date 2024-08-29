import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './userCase/create-user.useCase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UsersController } from './users.controller';
import { IUserRepository } from './repositories/user.repositories';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { ProfileUserUseCase } from './userCase/profile-user.usecase';
import { UploadAvatarUserUseCase } from './userCase/upload-avatar-user.usecase';
import { IStorage } from 'src/infra/providers/storage/storage';
import { SupabaseStorage } from 'src/infra/providers/storage/supabase.storage';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    ProfileUserUseCase,
    PrismaService,
    UploadAvatarUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class UsersModule {}
