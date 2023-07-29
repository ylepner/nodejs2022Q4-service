import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/models';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: ['e2231e94-1638-40f4-936d-c8ccb7bbf3dd'],
    albums: ['e42231e94-1638-40f4-936d-c8ccb7bbf3dd'],
    tracks: ['e2689e94-1638-40f4-936d-c8ccb7bbf3dd'],
  };

  getAllFavorites(): Promise<Favorites> {
    return Promise.resolve(this.favorites);
  }
}
