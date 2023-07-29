import { Album } from 'src/album/album.models';
import { Artist } from 'src/artist/artist.models';
import { Track } from 'src/track/track.models';

export interface FavoritesResponse {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
