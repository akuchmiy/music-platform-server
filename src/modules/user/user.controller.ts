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

  @Get(':userId/bands')
  getBands(@Param('userId') userId: string) {
    return this.bandService.getAllUserBands(userId)
  }
}
