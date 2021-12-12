import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { FileService, FileType } from '../file/file.service'
import { CreateBandDto } from '../../dtos/CreateBandDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Band } from '../../model/band.entity'
import { Repository } from 'typeorm'
import { User } from '../../model/user.entity'
import { UserService } from '../user/user.service'
import { Album } from '../../model/album.entity'

@Injectable()
export class BandService {
  constructor(
    private fileService: FileService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @InjectRepository(Band) private bandRepository: Repository<Band>
  ) {}

  async create(band: CreateBandDto, image: Express.Multer.File, user: User) {
    try {
      const extension = this.fileService.isValidExtension(FileType.IMAGE, image)

      const newBand = this.bandRepository.create({
        creator: user,
        ...band,
        picture: extension,
      })
      await this.bandRepository.save(newBand)

      this.fileService.writeFile(FileType.IMAGE, image, newBand.id)

      return newBand
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async getAllUserBands(userId: string): Promise<Band[]> {
    try {
      const user = await this.userService.findOne({ id: userId })

      return this.bandRepository.find({ where: { creator: user } })
    } catch (e) {
      throw new BadRequestException('Invalid user identifier')
    }
  }

  async getBandAlbums(bandId: string): Promise<Album[]> {
    try {
      const { albums } = await this.bandRepository.findOne({
        where: { id: bandId },
        relations: ['albums'],
      })
      return albums
    } catch (e) {
      throw new BadRequestException('Invalid band identifier')
    }
  }
}
