import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { TrackService } from './track.service'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateTrackDto } from '../../dtos/CreateTrackDto'
import { trackValidationPipe } from '../../pipes/trackValidationPipe'
import { JwtAccessAuthGuard } from '../auth/guards/jwt.auth.guard'

@Controller('tracks')
@UseGuards(JwtAccessAuthGuard)
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll(@Query() query: { take: string; skip: string }) {
    return this.trackService.getAll(query)
  }

  @Get(':trackId')
  getOne(@Param('trackId', ParseUUIDPipe) trackId: string) {
    return this.trackService.findOne(trackId, { relations: ['album'] })
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
