import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  writeFile(type: FileType, file: Express.Multer.File, id: string) {
    const extension = file.originalname.split('.')[1]
    const newName = `${id}.${extension}`
    const dirPath = path.resolve(__dirname, '..', '..', 'static', type)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    fs.writeFileSync(path.resolve(dirPath, newName), file.buffer)
  }
}
