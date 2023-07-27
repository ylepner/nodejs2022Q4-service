import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UsePipes,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.models';
import { checkId } from 'src/utils';
import { ZodValidationPipe } from 'nestjs-zod';

@UsePipes(ZodValidationPipe)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) { }

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
}
