import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { TrackService } from './track.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  loadTrack(@UploadedFile() file: Express.Multer.File) {}
}
