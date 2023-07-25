import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }


  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.userService.getUser(id);
  }

  @Get()
  findAll(): User[] {
    return this.userService.getAllUsers();
  }
}
