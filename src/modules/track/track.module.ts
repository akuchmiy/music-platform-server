import { Module } from '@nestjs/common'
import { TrackService } from './track.service'
import { TrackController } from './track.controller'
import { MulterModule } from '@nestjs/platform-express'
import { FileModule } from '../file/file.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Track } from '../../model/track.entity'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from '../auth/strategies/jwtStrategy'
import { Album } from '../../model/album.entity'
import { AlbumModule } from '../album/album.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, Album]),
    MulterModule,
    FileModule,
    UserModule,
    AlbumModule,
  ],
  providers: [TrackService, JwtStrategy],
  controllers: [TrackController],
})
export class TrackModule {}
