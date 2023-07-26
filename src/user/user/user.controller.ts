import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  UsePipes,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  createUserSchema,
  UpdatePassword,
  updatePasswordSchema,
  User,
} from './user.models';
import { ZodValidationPipe, createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { checkId } from 'src/utils';
class CreateUserDto extends createZodDto(createUserSchema) { }
class UpdatePasswordDto extends createZodDto(updatePasswordSchema) { }

@UsePipes(ZodValidationPipe)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    checkId(id);
    const result = await this.userService.getUser(id);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get()
  findAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateUserDto,) {
    const result = await this.userService.createUser(data);
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
    checkId(id);
  }

  @Delete(':id')
  //написать сообщение
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    checkId(id);
    const result = await this.userService.deleteUser(id);
    return result;
  }
}
