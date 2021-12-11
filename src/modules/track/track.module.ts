import { Module } from '@nestjs/common'
import { TrackService } from './track.service'
import { TrackController } from './track.controller'
import { MulterModule } from '@nestjs/platform-express'
import { FileModule } from '../file/file.module'

@Module({
  imports: [MulterModule, FileModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
