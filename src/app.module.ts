import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService } from './config/configService'
import { TokenModule } from './modules/auth/modules/token/token.module'
import { MailModule } from './modules/mail/mail.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TokenModule,
    MailModule,
  ],
})
export class AppModule {}
