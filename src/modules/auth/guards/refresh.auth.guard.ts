import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from '../modules/token/token.service'
import { configService } from '../../../config/configService'

function extractFromCookie(req, cookie) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies[cookie]
  }
  return token
}

const REFRESH_SECRET = configService.getValue('JWT_REFRESH_SECRET')

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const exception = new UnauthorizedException({
      message: 'Invalid credentials',
    })

    const token = extractFromCookie(request, 'refresh-token')
    let payload
    try {
      payload = this.jwtService.verify(token, { secret: REFRESH_SECRET })
    } catch (e) {
      throw exception
    }

    const user = await this.userService.findOne({ id: payload.sub })
    const valid = await this.tokenService.compareToken(user, token)

    if (!user || !valid) throw exception

    request.user = user
    return true
  }
}
