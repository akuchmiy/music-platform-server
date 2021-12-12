import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateAlbumDto } from '../../dtos/CreateAlbumDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Album } from '../../model/album.entity'
import { Repository } from 'typeorm'
import { Band } from '../../model/band.entity'
import { FileService, FileType } from '../file/file.service'

@Injectable()
export class AlbumService {
  constructor(
    private fileService: FileService,
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    @InjectRepository(Band) private bandRepository: Repository<Band>
  ) {}

  async create(album: CreateAlbumDto, image: Express.Multer.File) {
    try {
      const extension = this.fileService.isValidExtension(FileType.IMAGE, image)
      const band = await this.bandRepository.findOne(album.bandId)

      const newAlbum = this.albumRepository.create({
        name: album.name,
        band,
        picture: extension,
      })
      await this.albumRepository.save(newAlbum)

      this.fileService.writeFile(FileType.IMAGE, image, newAlbum.id)

      return newAlbum
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
