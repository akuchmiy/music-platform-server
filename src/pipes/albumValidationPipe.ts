import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateAlbumDto } from '../dtos/CreateAlbumDto'
import { isUUID } from '../tools/isUUID'

@Injectable()
export class albumValidationPipe implements PipeTransform {
  transform(album: CreateAlbumDto) {
    const exception = new BadRequestException('Validation failed')
    if (!album || !album.name || !album.bandId) throw exception

    const correct = isUUID(album.bandId)
    if (!correct) {
      throw exception
    }
    return album
  }
}
