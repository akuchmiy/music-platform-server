import { BadRequestException, Injectable } from '@nestjs/common'
import { FileService, FileType } from '../file/file.service'
import { CreateBandDto } from '../../dtos/CreateBandDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Band } from '../../model/band.entity'
import { Repository } from 'typeorm'
import { User } from '../../model/user.entity'

@Injectable()
export class BandService {
  constructor(
    private fileService: FileService,
    @InjectRepository(Band) private bandRepository: Repository<Band>
  ) {}

  async create(band: CreateBandDto, image: Express.Multer.File, user: User) {
    try {
      const newBand = this.bandRepository.create({
        creator: user,
        ...band,
      })
      await this.bandRepository.save(newBand)

      this.fileService.writeFile(FileType.IMAGE, image, newBand.id)

      return newBand
    } catch (e) {
      throw new BadRequestException('Invalid data')
    }
  }
}
