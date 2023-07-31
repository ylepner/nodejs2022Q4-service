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
import { TrackService } from './track.service';
import { Track, createTrackSchema } from './track.models';
import { checkId } from 'src/utils';
import { ZodValidationPipe, createZodDto } from 'nestjs-zod';

class CreateTrackDto extends createZodDto(createTrackSchema) {}
class UpdateTrackDto extends createZodDto(createTrackSchema) {}

@UsePipes(ZodValidationPipe)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Track> {
    checkId(id);
    const result = await this.trackService.getTrack(id);
    if (!result) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateTrackDto) {
    const result = await this.trackService.createTrack(data);
    return result;
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdateTrackDto) {
    checkId(id);
    const result = await this.trackService.updateTrack(id, data);
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    checkId(id);
    const result = await this.trackService.deleteTrack(id);
    return result;
  }
}
