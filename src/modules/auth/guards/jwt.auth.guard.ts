import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt-access-token') {}
