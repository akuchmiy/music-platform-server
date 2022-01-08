import { BadRequestException, Injectable } from '@nestjs/common'
import * as sharp from 'sharp'
import * as path from 'path'
import * as fs from 'fs'
import { constants } from '../../config/constants'
import { v4 as uuidv4 } from 'uuid'

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
  async writeFile(type: FileType, file: Express.Multer.File): Promise<string> {
    const extension = this.isValidExtension(type, file)
    const newName = `${uuidv4()}.${extension}`
    const dirPath = path.resolve(__dirname, '..', '..', 'static', type)
    const fullPath = path.resolve(dirPath, newName)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    if (type === FileType.IMAGE) {
      await FileService.saveCompressedImage(fullPath, file.buffer)
      return newName
    }

    fs.writeFileSync(fullPath, file.buffer)

    return newName
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

  private static async saveCompressedImage(fullPath: string, buffer: Buffer) {
    try {
      await sharp(buffer)
        .resize({ width: constants.DEFAULT_IMAGE_WIDTH })
        .toFile(fullPath)
    } catch (e) {
      throw new BadRequestException(`Invalid image ${e.message}`)
    }
  }
}
