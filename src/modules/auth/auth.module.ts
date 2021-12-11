import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { configService } from '../../config/configService'
import { LocalStrategy } from './strategies/localStrategy'
import { JwtStrategy } from './strategies/jwtStrategy'
import { TokenModule } from './modules/token/token.module'
import { MailModule } from '../mail/mail.module'

@Module({
  imports: [
    UserModule,
    TokenModule,
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: configService.getValue('JWT_ACCESS_SECRET'),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
