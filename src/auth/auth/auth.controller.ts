import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { singInSchema } from './auth.models';
import { createZodDto, ZodValidationPipe } from 'nestjs-zod';
import { createUserSchema } from 'src/user/user.models';

class SignInDto extends createZodDto(singInSchema) { }
class CreateUserDto extends createZodDto(createUserSchema) { }

@UsePipes(ZodValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }
}
