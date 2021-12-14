import { BadRequestException, Injectable } from '@nestjs/common'
import { FileService, FileType } from '../file/file.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Track } from '../../model/track.entity'
import { Repository } from 'typeorm'
import { CreateTrackDto } from '../../dtos/CreateTrackDto'
import { Album } from '../../model/album.entity'

@Injectable()
export class TrackService {
  constructor(
    private fileService: FileService,
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    @InjectRepository(Album) private albumRepository: Repository<Album>
  ) {}

  async saveTrack(
    track: CreateTrackDto,
    files: {
      image?: Express.Multer.File[]
      audio?: Express.Multer.File[]
    }
  ) {
    try {
      const { image, audio } = this.getFiles(files)
      const picExt = this.fileService.isValidExtension(FileType.IMAGE, image)
      const audioExt = this.fileService.isValidExtension(FileType.AUDIO, audio)

      const album = await this.albumRepository.findOne(track.albumId, {
        relations: ['band'],
      })

      const newTrack = this.trackRepository.create({
        ...track,
        album,
        picture: picExt,
        audio: audioExt,
      })
      await this.trackRepository.save(newTrack)

      this.fileService.writeFile(FileType.IMAGE, image, newTrack.id)
      this.fileService.writeFile(FileType.AUDIO, audio, newTrack.id)

      return newTrack
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  getFiles(files: {
    image?: Express.Multer.File[]
    audio?: Express.Multer.File[]
  }) {
    const exception = new BadRequestException('Not enough files')
    if (!files?.image || !files?.audio) throw exception

    const image = files.image[0]
    const audio = files.audio[0]
    if (!image || !audio) throw exception

    return { image, audio }
  }
}
