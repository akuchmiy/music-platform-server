import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.auth.guard'
import { User } from '../../model/user.entity'
import { Response } from 'express'
import { CreateUserDto } from '../../dtos/CreateUserDto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: { user: Partial<User> },
    @Res({ passthrough: true }) res: Response
  ): Promise<Partial<User>> {
    const user = req.user
    const tokens = await this.authService.login(user)

    res.cookie('token', tokens.accessToken, { httpOnly: true })

    return user
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<Partial<User>> {
    return await this.authService.register(user)
  }
}
