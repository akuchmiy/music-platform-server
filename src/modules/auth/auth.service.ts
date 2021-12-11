import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../../model/user.entity'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from '../../dtos/CreateUserDto'
import { configService } from '../../config/configService'
import { TokenService } from '../token/token.service'
import { MailService } from '../mail/mail.service'

@Injectable()
export class AuthService {
  refreshSecret: string

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private mailService: MailService
  ) {
    this.refreshSecret = configService.getValue('JWT_REFRESH_SECRET')
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ email })
    if (!user || !user.confirmed) return null

    const equals = await bcrypt.compare(password, user.password)
    if (equals) {
      return user
    }
    return null
  }

  async login(user: User) {
    const tokens = this.generateTokens(user)
    await this.tokenService.saveToken(user, tokens.refreshToken)

    return {
      user: AuthService.makeLoginData(user, tokens.accessToken),
      refreshToken: tokens.refreshToken,
    }
  }

  async register(user: CreateUserDto): Promise<User> {
    const encrypted = await bcrypt.hash(user.password, 7)

    const userEntity = await this.userService.createOne({
      email: user.email,
      password: encrypted,
    })

    await this.mailService.sendActivationMail(userEntity.email, userEntity.id)

    return userEntity
  }

  async activate(userId: string) {
    try {
      await this.userService.updateOne(userId, {
        confirmed: true,
      })
    } catch (e) {
      throw new BadRequestException({
        message: 'Invalid user id',
      })
    }
  }

  private static makeLoginData(user: User, accessToken: string) {
    const { password, ...withoutPassword } = user
    return {
      ...withoutPassword,
      accessToken,
    }
  }

  private generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id }
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '10d',
        secret: this.refreshSecret,
      }),
    }
  }
}
