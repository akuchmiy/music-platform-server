import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAccessAuthGuard } from '../auth/guards/jwt.auth.guard'
import { AlbumService } from './album.service'
import { CreateAlbumDto } from '../../dtos/CreateAlbumDto'
import { albumValidationPipe } from '../../pipes/albumValidationPipe'

@Controller('albums')
@UseGuards(JwtAccessAuthGuard)
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @UsePipes(albumValidationPipe)
  @Post()
  createAlbum(@Body() album: CreateAlbumDto) {
    return this.albumService.create(album)
  }
}
