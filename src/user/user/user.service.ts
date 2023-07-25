import { Injectable } from '@nestjs/common';
import { User } from 'src/models';

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

  getAllUsers() {
    debugger
    return this.users;
  }

  getUser(id: string) {
    return this.users.find((el) => el.id === id);
  }
}
