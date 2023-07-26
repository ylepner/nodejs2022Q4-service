import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './user.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '12345', // uuid v4
      login: 'login',
      password: 'password',
      version: 122, // integer number, increments on update
      createdAt: 12092012, // timestamp of creation
      updatedAt: 12092012, // timestamp of last update
    },
  ];

  getAllUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  getUser(id: string) {
    if (!isUuid) {
      throw new HttpException('user ID is invalid', HttpStatus.BAD_REQUEST);
    } else if (!isUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return Promise.resolve(this.users.find((el) => el.id === id));
  }

  createUser(userData: CreateUserDto) {
    const user = convertUserDataToUser(userData);
    this.users.push(user);
    return this.users;
  }
}

// if userId is invalid (not uuid)
function isUuid() {
  return true;
}

// if record with id === userId doesn't exist
function isUser() {
  return true;
}

function convertUserDataToUser(userData: CreateUserDto) {
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
