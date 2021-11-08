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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: { user: User },
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    const user = req.user
    const tokens = await this.authService.login(user)

    res.cookie('token', tokens.accessToken, { httpOnly: true })

    return user
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.register(user)
  }
}
