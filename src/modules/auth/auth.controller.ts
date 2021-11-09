import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.auth.guard'
import { User } from '../../model/user.entity'
import { Response } from 'express'
import { CreateUserDto } from '../../dtos/CreateUserDto'
import { Request } from 'express'
import { RefreshAuthGuard } from './guards/refresh.auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user
    const loginData = await this.authService.login(user)

    res.cookie('refresh-token', loginData.refreshToken, {
      httpOnly: true,
    })

    return loginData.user
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.register(user)
  }

  // @UseGuards(JwtRefreshAuthGuard)
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshAccessToken(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user
    const loginData = await this.authService.login(user)

    res.cookie('refresh-token', loginData.refreshToken, {
      httpOnly: true,
    })

    return loginData.user
  }
}
