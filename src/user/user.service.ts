import { Injectable } from '@nestjs/common';
import { CreateUser, UpdatePassword, User } from './user.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists, throwConflict, throwForbidden } from 'src/utils';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAllUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  getUser(id: string) {
    return Promise.resolve(this.users.find((el) => el.id === id));
  }

  createUser(userData: CreateUser) {
    if (this.users.find((el) => el.login === userData.login)) {
      throwConflict('User already exists');
    }
    const user = convertUserDataToUser(userData);
    this.users.push(user);
    return this.updateUser(user);
  }

  async updateUserPassword(id: string, userData: UpdatePassword) {
    const user = checkExists(await this.getUser(id), 'User not found');
    if (user.password !== userData.oldPassword) {
      throwForbidden('Wrong password');
    }
    user.password = userData.newPassword;
    user.updatedAt = new Date().valueOf();
    return this.updateUser(user);
  }

  async deleteUser(id: string) {
    const user = checkExists(await this.getUser(id), 'User not found');
    this.users = this.users.filter((el) => el.id !== user.id);
  }

  updateUser(user: User): Omit<User, 'password'> {
    user.version++;
    const result = {
      ...user,
    };
    delete (result as any).password;
    return result;
  }
}

function convertUserDataToUser(userData: CreateUser) {
  const id = uuidv4();
  const version = 0;
  const createdAt = new Date().valueOf();
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
