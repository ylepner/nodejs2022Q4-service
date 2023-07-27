import { Injectable } from '@nestjs/common';
import { Track } from './track.models';

@Injectable()
export class TrackService {
  private tracks: Track[] = [
    {
      id: 'e2689e94-1638-40f4-936d-c8ccb7bbf3dd',
      name: 'Track1',
      artistId: 'Artist1', // refers to Artist
      albumId: 'Album1', // refers to Album
      duration: 10202000, // integer number
    },
  ];

  getAllTracks(): Promise<Track[]> {
    return Promise.resolve(this.tracks);
  }

  getTrack(id: string) {
    return Promise.resolve(this.tracks.find((el) => el.id === id));
  }
}
