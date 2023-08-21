import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignIn } from './auth.models';
import { CreateUser } from 'src/user/user.models';
import { comparePasswordToHash, generateHash } from './utils';

const tokenExpiredTimeSec = process.env.TOKEN_EXPIRE_TIME || '30';
const refreshTokenExpiredTimeSec =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '86400';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignIn) {
    const user = await this.userService.getUserByLogin(data.login);
    if (user) {
      if (!(await comparePasswordToHash(data.password, user?.password))) {
        throw new UnauthorizedException();
      }
      const payloadAccess = { sub: user.id, username: user.login };
      const payloadRefresh = { sub: user.id, username: user.login };
      const accessToken = await this.generateAccessToken(payloadAccess);
      const refreshToken = await this.generateRefreshToken(payloadRefresh);
      return {
        accessToken,
        refreshToken,
      };
    }
    return null;
  }

  async signUp(data: CreateUser) {
    data.password = await generateHash(data.password);
    return await this.userService.createUser(data);
  }

  async generateAccessToken(payload: { sub: string; username: string }) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: tokenExpiredTimeSec,
    });
  }

  async generateRefreshToken(payload: { sub: string; username: string }) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: refreshTokenExpiredTimeSec,
    });
  }

  async refresh(token: string) {
    try {
      const verify = await this.jwtService.verifyAsync(token);
      verify;
      const payload = { sub: verify.sub, username: verify.username };
      const result = await this.generateAccessToken(payload);
      return {
        accessToken: result,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
