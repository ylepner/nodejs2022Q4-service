import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUser, UpdatePassword, User, UserDto } from './user.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists, throwForbidden } from 'src/utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    return (await this.prisma.user.findMany()).map((el) => toUserDto(el));
  }

  getUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(userData: CreateUser) {
    const data = convertUserDataToUser(userData);
    await this.prisma.user.create({
      data: data,
    });
    const result = toUserDto(data);
    return result;
  }

  async getUserDto(id: string): Promise<UserDto | undefined> {
    const user = await this.getUser(id);
    if (user) {
      return toUserDto(user);
    }
    return undefined;
  }

  async updateUserPassword(id: string, userData: UpdatePassword) {
    const user = checkExists(await this.getUser(id), 'User not found');
    console.log('Update user get', user)
    if (user.password !== userData.oldPassword) {
      throwForbidden('Wrong password');
    }
    user.password = userData.newPassword;
    user.updatedAt = new Date();
    const result = this.updateUser(user);
    return result;
  }

  async deleteUser(id: string) {
    checkExists(await this.getUser(id), 'User not found');
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUser(user: User) {
    user.version++;
    const result = {
      ...user,
    };
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
    return toUserDto(result);
  }
}

function convertUserDataToUser(userData: CreateUser) {
  const id = uuidv4();
  const version = 1;
  const createdAt = new Date();
  const result: User = {
    id: id,
    login: userData.login,
    password: userData.password,
    version: version,
    createdAt: createdAt,
    updatedAt: createdAt,
  };
  return result;
}

function toUserDto(user: User): UserDto {
  const userDto: UserDto = {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt.valueOf(),
    updatedAt: user.updatedAt.valueOf(),
  };
  return userDto;
}
