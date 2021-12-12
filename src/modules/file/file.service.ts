import { BadRequestException, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

const validExtensions = {
  audio: ['mp3'],
  image: ['png', 'jpg', 'jpeg', 'webp'],
}

@Injectable()
export class FileService {
  writeFile(type: FileType, file: Express.Multer.File, id: string) {
    const extension = this.getExtension(file)
    const newName = `${id}.${extension}`
    const dirPath = path.resolve(__dirname, '..', '..', 'static', type)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    fs.writeFileSync(path.resolve(dirPath, newName), file.buffer)
  }

  getExtension(file: Express.Multer.File): string {
    return file.originalname.split('.')[1]
  }

  isValidExtension(type: FileType, file: Express.Multer.File): string {
    const extension = this.getExtension(file)
    if (!validExtensions[type].includes(extension)) {
      throw new BadRequestException('Invalid file extension')
    }

    return extension
  }
}
