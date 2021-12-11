import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateBandDto } from '../dtos/CreateBandDto'
import { constants } from '../config/constants'

@Injectable()
export class bandValidationPipe implements PipeTransform {
  transform(band: CreateBandDto) {
    const exception = new BadRequestException('Validation failed')
    if (!band.name || !band.description) throw exception

    if (!isValidBand(band)) {
      throw exception
    }
    return band
  }
}

function isValidBand(band: CreateBandDto): boolean {
  if (
    band.name.length < constants.MIN_CHARS_BAND_NAME ||
    band.description.length > constants.MAX_CHARS_BAND_DESCRIPTION
  )
    return false
  return true
}
