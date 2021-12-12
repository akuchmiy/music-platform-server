import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateAlbumDto } from '../../dtos/CreateAlbumDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Album } from '../../model/album.entity'
import { Repository } from 'typeorm'
import { Band } from '../../model/band.entity'

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    @InjectRepository(Band) private bandRepository: Repository<Band>
  ) {}

  async create(album: CreateAlbumDto) {
    try {
      const band = await this.bandRepository.findOne(album.bandId)

      const newAlbum = this.albumRepository.create({
        name: album.name,
        band,
      })
      await this.albumRepository.save(newAlbum)

      return newAlbum
    } catch (e) {
      throw new BadRequestException('Invalid data')
    }
  }
}
