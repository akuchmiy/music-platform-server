import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAccessAuthGuard } from '../auth/guards/jwt.auth.guard'
import { AlbumService } from './album.service'
import { CreateAlbumDto } from '../../dtos/CreateAlbumDto'
import { albumValidationPipe } from '../../pipes/albumValidationPipe'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('albums')
@UseGuards(JwtAccessAuthGuard)
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get(':albumId')
  getOne(@Param('albumId', ParseUUIDPipe) albumId: string) {
    return this.albumService.findOne(albumId, { relations: ['tracks', 'band'] })
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  createAlbum(
    @Body(albumValidationPipe) album: CreateAlbumDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.albumService.create(album, image)
  }
}
