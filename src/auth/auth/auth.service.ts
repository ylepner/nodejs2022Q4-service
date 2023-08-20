import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignIn } from './auth.models';
import { CreateUser } from 'src/user/user.models';
import { comparePasswordToHash, generateHash } from './utils';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(data: SignIn) {
    const user = await this.userService.getUserByLogin(data.login);
    if (user) {
      if (!(await comparePasswordToHash(data.password, user?.password))) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.login };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }

  async signUp(data: CreateUser) {
    data.password = await generateHash(data.password);
    return await this.userService.createUser(data);
  }
}
