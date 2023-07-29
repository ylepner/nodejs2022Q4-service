import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) { }

  @Get()
  findAll() {
    return this.favoritesService.getAllFavorites();
  }
}
