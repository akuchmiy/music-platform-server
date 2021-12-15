import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { TrackService } from './track.service'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateTrackDto } from '../../dtos/CreateTrackDto'
import { trackValidationPipe } from '../../pipes/trackValidationPipe'

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll(@Query() query: { take: string; skip: string }) {
    return this.trackService.getAll(query)
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ])
  )
  @Post()
  loadTrack(
    @Body(trackValidationPipe) track: CreateTrackDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[]
      audio?: Express.Multer.File[]
    }
  ) {
    return this.trackService.saveTrack(track, files)
  }
}
