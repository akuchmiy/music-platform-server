import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateAlbumDto } from '../dtos/CreateAlbumDto'

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

export function isUUID(str: string) {
  const pattern =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
  return pattern.test(str)
}
