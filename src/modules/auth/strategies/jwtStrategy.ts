import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { configService } from '../../../config/configService'
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
    return this.userService.findOne({ id: payload.sub })
  }
}
