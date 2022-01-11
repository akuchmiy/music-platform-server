import { BadRequestException, Injectable } from '@nestjs/common'
import { FileService, FileType } from '../file/file.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Track } from '../../model/track.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateTrackDto } from '../../dtos/CreateTrackDto'
import { AlbumService } from '../album/album.service'

@Injectable()
export class TrackService {
  constructor(
    private fileService: FileService,
    private albumService: AlbumService,
    @InjectRepository(Track) private trackRepository: Repository<Track>
  ) {}

  async findOne(
    trackId: string,
    options?: FindOneOptions<Track>
  ): Promise<Track> {
    const track = await this.trackRepository.findOne(trackId, options)
    if (!track) throw new BadRequestException('Invalid band id')

    return track
  }

  getAll({ take, skip }: { take: string; skip: string }): Promise<Track[]> {
    return this.trackRepository.find({
      relations: ['album', 'album.band'],
      take: take ? +take : 20,
      skip: skip ? +skip : 0,
    })
  }

  async saveTrack(
    track: CreateTrackDto,
    files: {
      image?: Express.Multer.File[]
      audio?: Express.Multer.File[]
    }
  ) {
    try {
      const { image, audio } = TrackService.getFiles(files)
      const album = await this.albumService.findOne(track.albumId)

      const [pictureName, audioName] = await Promise.all([
        this.fileService.writeFile(FileType.IMAGE, image),
        this.fileService.writeFile(FileType.AUDIO, audio),
      ])

      const newTrack = this.trackRepository.create({
        ...track,
        album,
        picture: pictureName,
        audio: audioName,
      })

      await this.trackRepository.save(newTrack)

      return newTrack
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  private static getFiles(files: {
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
