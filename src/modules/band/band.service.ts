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
import { FindOneOptions, Repository } from 'typeorm'
import { User } from '../../model/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class BandService {
  constructor(
    private fileService: FileService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @InjectRepository(Band) private bandRepository: Repository<Band>
  ) {}

  getAll({ take, skip }: { take: string; skip: string }): Promise<Band[]> {
    return this.bandRepository.find({
      take: take ? +take : 20,
      skip: skip ? +skip : 0,
    })
  }

  async findOne(bandId: string, options?: FindOneOptions<Band>): Promise<Band> {
    const band = await this.bandRepository.findOne(bandId, options)
    if (!band) throw new BadRequestException('Invalid band id')

    return band
  }

  async create(band: CreateBandDto, image: Express.Multer.File, user: User) {
    try {
      const pictureName = await this.fileService.writeFile(
        FileType.IMAGE,
        image
      )

      const newBand = this.bandRepository.create({
        creator: user,
        ...band,
        picture: pictureName,
      })

      await this.bandRepository.save(newBand)

      return newBand
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async getAllUserBands(userId: string): Promise<Band[]> {
    const user = await this.userService.findOne({ id: userId })

    return this.bandRepository.find({ where: { creator: user } })
  }
}
