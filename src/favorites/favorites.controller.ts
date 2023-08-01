import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    const result = await this.favoritesService.addTrack(id);
    return result;
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    const result = await this.favoritesService.deleteTrack(id);
    return result;
  }

  @Post('/album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    const result = await this.favoritesService.addAlbum(id);
    return result;
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    const result = await this.favoritesService.deleteAlbum(id);
    return result;
  }

  @Post('/artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    const result = await this.favoritesService.addArtist(id);
    return result;
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    const result = await this.favoritesService.deleteArtist(id);
    return result;
  }
}
