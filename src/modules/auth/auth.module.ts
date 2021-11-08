import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { configService } from '../../config/configService'
import { LocalStrategy } from './strategies/localStrategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configService.getValue('JWT_SECRET'),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
