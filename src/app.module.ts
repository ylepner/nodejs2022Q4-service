import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TrackController } from './track/track.controller';
import { ArtistController } from './artist/artist.controller';
import { UserService } from './user/user.service';
import { TrackService } from './track/track.service';
import { ArtistService } from './artist/artist.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TrackController, ArtistController],
  providers: [AppService, UserService, TrackService, ArtistService],
})
export class AppModule { }
