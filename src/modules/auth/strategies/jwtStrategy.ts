import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { configService } from '../../../config/configService'
import { ExtractJwt } from 'passport-jwt'
import { UserService } from '../../user/user.service'
import { CreateTokenDto } from '../../../dtos/CreateTokenDto'

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token'
) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: configService.getValue('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: CreateTokenDto) {
    const user = await this.userService.findOne({ id: payload.sub })

    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
      })
    }

    return user
  }
}
