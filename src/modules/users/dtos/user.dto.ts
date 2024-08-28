export type CreateUserDto = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserCreateDto = {
  id: string;
  createAt: Date;
  updateAt: Date;
} & CreateUserDto;

export type UserNameAndEmail = {
  username: string;
  email: string;
};
