import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TrackController } from './track/track.controller';
import { ArtistController } from './artist/artist.controller';
import { UserService } from './user/user.service';
import { TrackService } from './track/track.service';
import { ArtistService } from './artist/artist.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { FavoritesService } from './favorites/favorites.service';
import { FavoritesController } from './favorites/favorites.controller';
import { LoggerMiddleware } from './logging/logger.middleware';
import { LoggingService } from './logging/logging.service';
import { HttpExceptionFilter } from './logging/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth/auth.controller';
import { AuthService } from './auth/auth/auth.service';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavoritesController,
    AuthController,
  ],
  providers: [
    AppService,
    UserService,
    TrackService,
    ArtistService,
    AlbumService,
    FavoritesService,
    AuthService,
    LoggingService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
