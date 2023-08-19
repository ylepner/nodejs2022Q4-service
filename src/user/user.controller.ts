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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserSchema, updatePasswordSchema, UserDto } from './user.models';
import { ZodValidationPipe, createZodDto } from 'nestjs-zod';
import { checkId } from 'src/utils';
import { AuthGuard } from 'src/auth/auth/auth.quard';
class CreateUserDto extends createZodDto(createUserSchema) { }
class UpdatePasswordDto extends createZodDto(updatePasswordSchema) { }

@UsePipes(ZodValidationPipe)
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async findAll() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    checkId(id);
    const result = await this.userService.getUserDto(id);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateUserDto) {
    const result = this.userService.createUser(data);
    return result;
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
    checkId(id);
    const result = await this.userService.updateUserPassword(id, data);
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    checkId(id);
    const result = await this.userService.deleteUser(id);
    return result;
  }
}
