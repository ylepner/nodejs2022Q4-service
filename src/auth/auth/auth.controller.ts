import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { singInSchema } from './auth.models';
import { createZodDto, ZodValidationPipe } from 'nestjs-zod';
import { createUserSchema } from 'src/user/user.models';

class SignInDto extends createZodDto(singInSchema) {}
class CreateUserDto extends createZodDto(createUserSchema) {}

@UsePipes(ZodValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @HttpCode(200)
  @Post('signup')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @HttpCode(200)
  @Post('refresh')
  refresh(@Body() token: string) {
    return this.authService.refresh(token);
  }
}
