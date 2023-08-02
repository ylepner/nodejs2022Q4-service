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

  async getAllUsers(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(userData: CreateUser) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        login: userData.login,
      },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const data = convertUserDataToUser(userData);
    return this.prisma.user.create({
      data: data,
    });
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
    if (user.password !== userData.oldPassword) {
      throwForbidden('Wrong password');
    }
    user.password = userData.newPassword;
    user.updatedAt = new Date();
    return this.updateUser(user);
  }

  async deleteUser(id: string) {
    checkExists(await this.getUser(id), 'User not found');
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  updateUser(user: User): UserDto {
    user.version++;
    const result = {
      ...user,
    };
    return toUserDto(result);
  }
}

function convertUserDataToUser(userData: CreateUser) {
  const id = uuidv4();
  const version = 0;
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
  const result = { ...user };
  delete (result as any).password;
  return result;
}
