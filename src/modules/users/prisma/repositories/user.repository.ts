import {
  CreateUserDto,
  UserCreateDto,
  UserNameAndEmail,
} from '../../dtos/user.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(
    data: UserNameAndEmail,
  ): Promise<UserCreateDto | null>;

  abstract save(data: CreateUserDto): Promise<UserCreateDto | null>;
}
