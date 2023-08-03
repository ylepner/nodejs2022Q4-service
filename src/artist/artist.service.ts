import { Injectable } from '@nestjs/common';
import { Artist, UpdateArtistRequest } from './artist.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists } from 'src/utils';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ArtistService {
  private prisma: PrismaClient;
  constructor(
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {
    this.prisma = new PrismaClient();
  }

  getAllArtists(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  getArtist(id: string) {
    return this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
  }

  createArtist(artistData: Omit<Artist, 'id'>) {
    const uuid = uuidv4();
    const artist = {
      ...artistData,
      id: uuid,
    };
    return this.prisma.artist.create({
      data: artist,
    });
  }

  async updateArtist(id: string, artistData: UpdateArtistRequest) {
    checkExists(await this.getArtist(id), 'Track not found');
    const artist: Artist = {
      id: id,
      name: artistData.name,
      grammy: artistData.grammy,
    };
    return this.prisma.artist.update({
      where: {
        id,
      },
      data: artist,
    });
  }

  async deleteArtist(id: string) {
    checkExists(await this.getArtist(id), 'Track not found');
    this.trackService.updateTracksAfterArtistDeleted(id);
    this.albumService.updateAlbumsAfterArtistDeleted(id);
    return this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }
}
