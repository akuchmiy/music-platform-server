import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { isUUID } from '../tools/isUUID'
import { CreateTrackDto } from '../dtos/CreateTrackDto'

@Injectable()
export class trackValidationPipe implements PipeTransform {
  transform(track: CreateTrackDto) {
    const exception = new BadRequestException('Validation failed')
    if (!track || !track.name || !track.text || !track.albumId) throw exception

    const correct = isUUID(track.albumId)
    if (!correct) {
      throw exception
    }
    return track
  }
}
