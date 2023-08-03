import { Injectable } from '@nestjs/common';
import { Album, UpdateAlbumRequest } from './album.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists } from 'src/utils';
import { TrackService } from 'src/track/track.service';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class AlbumService {
  private prisma: PrismaClient;
  constructor(private trackService: TrackService) {
    this.prisma = new PrismaClient();
  }

  getAllAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  getAlbum(id: string) {
    return this.prisma.album.findUnique({
      where: {
        id,
      },
    });
  }

  createAlbum(albumData: Omit<Album, 'id'>) {
    const uuid = uuidv4();
    const album = {
      ...albumData,
      id: uuid,
    };
    return this.prisma.album.create({
      data: album,
    });
  }

  async updateAlbum(id: string, albumData: UpdateAlbumRequest) {
    checkExists(await this.getAlbum(id), 'Album not found');
    const album: Album = {
      id: id,
      name: albumData.name,
      year: albumData.year,
      artistId: albumData.artistId,
    };
    return this.prisma.album.update({
      where: {
        id,
      },
      data: album,
    });
  }

  async deleteAlbum(id: string) {
    checkExists(await this.getAlbum(id), 'Album not found');
    await this.trackService.updateTracksAfterAlbumDeleted(id);
    await this.prisma.album.delete({
      where: {
        id,
      },
    });
  }

  async updateAlbumsAfterArtistDeleted(id: string) {
    const albums = (await this.getAllAlbums()).filter(
      (el) => el.artistId === id,
    );
    for (const album of albums) {
      album.artistId = null;
      await this.prisma.album.update({
        where: {
          id: album.id,
        },
        data: album,
      });
    }
  }
}
