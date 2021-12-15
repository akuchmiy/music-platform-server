import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
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

  @Get()
  getAll(@Query() query: { take: string; skip: string }) {
    return this.bandService.getAll(query)
  }

  @Get(':bandId')
  getOne(@Param('bandId', ParseUUIDPipe) bandId: string) {
    return this.bandService.findOne(bandId, { relations: ['albums'] })
  }

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
