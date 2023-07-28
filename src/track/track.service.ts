import { Injectable } from '@nestjs/common';
import { Track, UpdateRequest } from './track.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists } from 'src/utils';

@Injectable()
export class TrackService {
  constructor() {
  }
  private tracks: Track[] = [
    {
      id: 'e2689e94-1638-40f4-936d-c8ccb7bbf3dd',
      name: 'Track1',
      artistId: 'e0123e94-1638-40f4-936d-c8ccb7bbf3dd', // refers to Artist
      albumId: 'e3456e94-1638-40f4-936d-c8ccb7bbf3dd', // refers to Album
      duration: 10202000, // integer number
    },
  ];

  getAllTracks(): Promise<Track[]> {
    return Promise.resolve(this.tracks);
  }

  getTrack(id: string) {
    return Promise.resolve(this.tracks.find((el) => el.id === id));
  }

  createTrack(trackData: Omit<Track, 'id'>) {
    const uuid = uuidv4();
    const track = {
      ...trackData,
      id: uuid,
    };
    this.tracks.push(track);
    return Promise.resolve(track);
  }

  async updateTrack(id: string, trackData: UpdateRequest) {
    checkExists(await this.getTrack(id), 'Track not found');
    const track: Track = {
      id: id,
      name: trackData.name,
      albumId: trackData.albumId ?? null,
      artistId: trackData.artistId ?? null,
      duration: trackData.duration,
    };
    const index = this.tracks.findIndex((el) => el.id === id);
    this.tracks[index] = track;
    return track;
  }

  async deleteTrack(id: string) {
    checkExists(await this.getTrack(id), 'Track not found');
    this.tracks = this.tracks.filter((el) => el.id !== id);
  }

  updateTracksAfterArtistDeleted(id: string) {
    this.tracks.forEach((el) => {
      if (el.artistId === id) {
        el.artistId = null;
      }
    });
  }
}
