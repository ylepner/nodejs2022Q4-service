import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/models';
import { FavoritesResponse } from './favorites.models';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import {
  checkExists,
  checkId,
  isNotNull,
  throwUnprocessableEntity,
} from 'src/utils';

@Injectable()
export class FavoritesService {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getAllFavorites(): Promise<FavoritesResponse> {
    const albums = (
      await Promise.all(
        this.favorites.albums.map((el) => this.albumService.getAlbum(el)),
      )
    ).filter(isNotNull);
    const artists = (
      await Promise.all(
        this.favorites.artists.map((el) => this.artistService.getArtist(el)),
      )
    ).filter(isNotNull);
    const tracks = (
      await Promise.all(
        this.favorites.tracks.map((el) => this.trackService.getTrack(el)),
      )
    ).filter(isNotNull);
    return {
      albums: albums,
      artists: artists,
      tracks: tracks,
    };
  }

  async addTrack(id: string) {
    checkId(id);
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throwUnprocessableEntity();
    }
    this.favorites.tracks.push(id);
  }

  async deleteTrack(id: string) {
    checkId(id);
    checkExists(await this.trackService.getTrack(id), 'Track not found');
    this.favorites.tracks = this.favorites.tracks.filter((el) => el !== id);
  }

  async addAlbum(id: string) {
    checkId(id);
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throwUnprocessableEntity();
    }
    this.favorites.albums.push(id);
  }

  async deleteAlbum(id: string) {
    checkId(id);
    checkExists(await this.albumService.getAlbum(id), 'Album not found');
    this.favorites.albums = this.favorites.albums.filter((el) => el !== id);
  }

  async addArtist(id: string) {
    checkId(id);
    const artist = await this.artistService.getArtist(id);
    if (!artist) {
      throwUnprocessableEntity();
    }
    this.favorites.artists.push(id);
  }

  async deleteArtist(id: string) {
    checkId(id);
    checkExists(await this.artistService.getArtist(id), 'Artist not found');
    this.favorites.artists = this.favorites.artists.filter((el) => el !== id);
  }
}
