import { Injectable } from '@nestjs/common';
import { Artist, UpdateArtistRequest } from './artist.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists } from 'src/utils';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}
  private artists: Artist[] = [];

  getAllArtists(): Promise<Artist[]> {
    return Promise.resolve(this.artists);
  }

  getArtist(id: string) {
    return Promise.resolve(this.artists.find((el) => el.id === id));
  }

  createArtist(artistData: Omit<Artist, 'id'>) {
    const uuid = uuidv4();
    const artist = {
      ...artistData,
      id: uuid,
    };
    this.artists.push(artist);
    return Promise.resolve(artist);
  }

  async updateArtist(id: string, artistData: UpdateArtistRequest) {
    checkExists(await this.getArtist(id), 'Track not found');
    const artist: Artist = {
      id: id,
      name: artistData.name,
      grammy: artistData.grammy,
    };
    const index = this.artists.findIndex((el) => el.id === id);
    this.artists[index] = artist;
    return artist;
  }

  async deleteArtist(id: string) {
    checkExists(await this.getArtist(id), 'Track not found');
    this.trackService.updateTracksAfterArtistDeleted(id);
    this.albumService.updateAlbumsAfterArtistDeleted(id);
    this.artists = this.artists.filter((el) => el.id !== id);
  }
}
