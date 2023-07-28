import { Injectable } from '@nestjs/common';
import { Album, UpdateAlbumRequest } from './album.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists } from 'src/utils';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(private trackService: TrackService) { }
  private albums: Album[] = [
    {
      id: 'e2231e94-1638-40f4-936d-c8ccb7bbf3dd',
      name: 'Album1',
      year: 1990,
      artistId: 'e2231e94-1638-40f4-936d-c8ccb7bbf3dd',
    },
  ];

  getAllAlbums(): Promise<Album[]> {
    return Promise.resolve(this.albums);
  }

  getAlbum(id: string) {
    return Promise.resolve(this.albums.find((el) => el.id === id));
  }

  createAlbum(albumData: Omit<Album, 'id'>) {
    const uuid = uuidv4();
    const album = {
      ...albumData,
      id: uuid,
    };
    this.albums.push(album);
    return Promise.resolve(album);
  }

  async updateAlbum(id: string, albumData: UpdateAlbumRequest) {
    checkExists(await this.getAlbum(id), 'Album not found');
    const album: Album = {
      id: id,
      name: albumData.name,
      year: albumData.year,
      artistId: albumData.artistId,
    };
    const index = this.albums.findIndex((el) => el.id === id);
    this.albums[index] = album;
    return album;
  }

  async deleteAlbum(id: string) {
    checkExists(await this.getAlbum(id), 'Album not found');
    this.trackService.updateTracksAfterAlbumDeleted(id);
    this.albums = this.albums.filter((el) => el.id !== id);
  }

  updateAlbumsAfterArtistDeleted(id: string) {
    this.albums.forEach((el) => {
      if (el.artistId === id) {
        el.artistId = null;
      }
    });
  }
}
