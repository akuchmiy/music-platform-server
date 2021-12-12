import { Module } from '@nestjs/common'
import { AlbumService } from './album.service'
import { AlbumController } from './album.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Album } from '../../model/album.entity'
import { JwtStrategy } from '../auth/strategies/jwtStrategy'
import { UserModule } from '../user/user.module'
import { Band } from '../../model/band.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Album, Band]), UserModule],
  providers: [AlbumService, JwtStrategy],
  controllers: [AlbumController],
})
export class AlbumModule {}
