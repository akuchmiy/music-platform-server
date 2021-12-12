import { BadRequestException, Injectable } from '@nestjs/common'
import { FileService, FileType } from '../file/file.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Track } from '../../model/track.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TrackService {
  constructor(
    private fileService: FileService,
    @InjectRepository(Track) private trackRepository: Repository<Track>
  ) {}

  saveTrack(file: Express.Multer.File) {
    try {
    } catch (e) {
      throw new BadRequestException('Invalid album identifier')
    }
  }
}
