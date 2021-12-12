import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common'
import { JwtAccessAuthGuard } from '../auth/guards/jwt.auth.guard'
import { BandService } from '../band/band.service'

@Controller('users')
@UseGuards(JwtAccessAuthGuard)
export class UserController {
  constructor(
    @Inject(forwardRef(() => BandService))
    private bandService: BandService
  ) {}

  @Get(':id/bands')
  getBands(@Param('id') id: string) {
    return this.bandService.getAllUserBands(id)
  }
}
