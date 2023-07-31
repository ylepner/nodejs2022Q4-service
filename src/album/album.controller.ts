import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { createZodDto, ZodValidationPipe } from 'nestjs-zod';
import { checkId } from 'src/utils';
import { Album, createAlbumSchema } from './album.models';

class CreateAlbumDto extends createZodDto(createAlbumSchema) {}
class UpdateAlbumDto extends createZodDto(createAlbumSchema) {}

@UsePipes(ZodValidationPipe)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    checkId(id);
    const result = await this.albumService.getAlbum(id);
    if (!result) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateAlbumDto) {
    const result = await this.albumService.createAlbum(data);
    return result;
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdateAlbumDto) {
    checkId(id);
    const result = await this.albumService.updateAlbum(id, data);
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    checkId(id);
    const result = await this.albumService.deleteAlbum(id);
    return result;
  }
}
