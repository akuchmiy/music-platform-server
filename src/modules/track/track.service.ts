import { Injectable } from '@nestjs/common'
import { FileService, FileType } from '../file/file.service'

@Injectable()
export class TrackService {
  constructor(private fileService: FileService) {}

  saveTrack(file: Express.Multer.File) {}
}
