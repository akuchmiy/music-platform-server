import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { TrackService } from './track.service'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'song', maxCount: 1 },
    ])
  )
  @Post()
  loadTrack(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[]
      song?: Express.Multer.File[]
    }
  ) {}
}
