import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService } from './config/configService'
import { TokenModule } from './modules/auth/modules/token/token.module'
import { MailModule } from './modules/mail/mail.module'
import { FileModule } from './modules/file/file.module'
import { TrackModule } from './modules/track/track.module'
import { BandModule } from './modules/band/band.module'
import { AlbumModule } from './modules/album/album.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    AuthModule,
    UserModule,
    TokenModule,
    MailModule,
    FileModule,
    TrackModule,
    BandModule,
    AlbumModule,
  ],
})
export class AppModule {}
