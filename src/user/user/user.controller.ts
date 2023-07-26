import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, User } from './user.models';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const result = await this.userService.getUser(id);
    return result;
  }

  @Get()
  findAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }
}
