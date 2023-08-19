import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignIn } from './auth.models';
import { CreateUser } from 'src/user/user.models';
import { generateHash } from './utils';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(data: SignIn) {
    const user = await this.userService.getUserByLogin(data.login);
    if (user?.password !== data.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: CreateUser) {
    data.password = await generateHash(data.password);
    return await this.userService.createUser(data);
  }
}
