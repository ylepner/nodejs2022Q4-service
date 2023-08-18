import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { singInSchema } from './auth.models';
import { createZodDto, ZodValidationPipe } from 'nestjs-zod';

class SignInDto extends createZodDto(singInSchema) { }

@UsePipes(ZodValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.login, data.password);
  }
}
