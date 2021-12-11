import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { BandService } from './band.service'
import { CreateBandDto } from '../../dtos/CreateBandDto'
import { bandValidationPipe } from '../../pipes/bandValidationPipe'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAccessAuthGuard } from '../auth/guards/jwt.auth.guard'
import { User } from '../../model/user.entity'

@Controller('bands')
@UseGuards(JwtAccessAuthGuard)
export class BandController {
  constructor(private bandService: BandService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  createBand(
    @Req() req: Request & { user: User },
    @Body(bandValidationPipe) band: CreateBandDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    const user = req.user
    return this.bandService.create(band, image, user)
  }
}
