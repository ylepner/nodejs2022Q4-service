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
import { ArtistService } from './artist.service';
import { Artist, createArtistSchema } from './artist.models';
import { checkId } from 'src/utils';
import { ZodValidationPipe, createZodDto } from 'nestjs-zod';

class CreateArtistDto extends createZodDto(createArtistSchema) {}
class UpdateArtistDto extends createZodDto(createArtistSchema) {}

@UsePipes(ZodValidationPipe)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    checkId(id);
    const result = await this.artistService.getArtist(id);
    if (!result) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateArtistDto) {
    const result = await this.artistService.createArtist(data);
    return result;
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdateArtistDto) {
    checkId(id);
    const result = await this.artistService.updateArtist(id, data);
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    checkId(id);
    const result = await this.artistService.deleteArtist(id);
    return result;
  }
}
