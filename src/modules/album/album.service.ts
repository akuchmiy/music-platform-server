import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateAlbumDto } from '../../dtos/CreateAlbumDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Album } from '../../model/album.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { FileService, FileType } from '../file/file.service'
import { BandService } from '../band/band.service'

@Injectable()
export class AlbumService {
  constructor(
    private fileService: FileService,
    private bandService: BandService,
    @InjectRepository(Album) private albumRepository: Repository<Album>
  ) {}

  async findOne(
    albumId: string,
    options?: FindOneOptions<Album>
  ): Promise<Album> {
    const album = await this.albumRepository.findOne(albumId, options)
    if (!album) throw new BadRequestException('Invalid album id')

    return album
  }

  async create(album: CreateAlbumDto, image: Express.Multer.File) {
    try {
      const extension = this.fileService.isValidExtension(FileType.IMAGE, image)
      const band = await this.bandService.findOne(album.bandId)

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
