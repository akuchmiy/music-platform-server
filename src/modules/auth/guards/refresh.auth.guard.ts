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
  if (req && req.cookies) {
    return req.cookies[cookie]
  } else {
    throw new Error(`No cookie ${cookie}`)
  }
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

    try {
      const token = extractFromCookie(request, 'refresh-token')
      const payload = this.jwtService.verify(token, { secret: REFRESH_SECRET })

      const user = await this.userService.findOne({ id: payload.sub })
      await this.tokenService.compareToken(user, token)
      request.user = user
      return true
    } catch (e) {
      throw exception
    }
  }
}
