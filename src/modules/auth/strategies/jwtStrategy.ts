import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { configService } from '../../../config/configService'

function extractFromCookie(req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['token']
  }
  return token
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: configService.getValue('JWT_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: extractFromCookie,
    })
  }

  validate(payload) {
    return { email: payload.email, id: payload.sub }
  }
}
