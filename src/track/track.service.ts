import { Injectable } from '@nestjs/common';
import { Track, UpdateRequest } from './track.models';
import { v4 as uuidv4 } from 'uuid';
import { checkExists } from 'src/utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TrackService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllTracks() {
    return this.prisma.track.findMany();
  }

  async getTrack(id: string) {
    return this.prisma.track.findUnique({
      where: {
        id,
      },
    });
  }

  async createTrack(trackData: Omit<Track, 'id'>) {
    const uuid = uuidv4();
    const track = {
      ...trackData,
      id: uuid,
    };
    return this.prisma.track.create({
      data: track,
    });
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
    return this.prisma.track.update({
      where: {
        id,
      },
      data: track,
    });
  }

  async deleteTrack(id: string) {
    checkExists(await this.getTrack(id), 'Track not found');
    return this.prisma.track.delete({
      where: {
        id,
      },
    });
  }

  async updateTracksAfterArtistDeleted(id: string) {
    const tracks = (await this.getAllTracks()).filter(
      (el) => el.artistId === id,
    );
    for (const track of tracks) {
      track.artistId = null;
      await this.prisma.track.update({
        where: {
          id: track.id,
        },
        data: track,
      });
    }
  }

  async updateTracksAfterAlbumDeleted(id: string) {
    const tracks = (await this.getAllTracks()).filter(
      (el) => el.albumId === id,
    );
    for (const track of tracks) {
      track.albumId = null;
      await this.prisma.track.update({
        where: {
          id: track.id,
        },
        data: track,
      });
    }
  }
}
