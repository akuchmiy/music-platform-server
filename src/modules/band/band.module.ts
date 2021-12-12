import { forwardRef, Module } from '@nestjs/common'
import { BandController } from './band.controller'
import { BandService } from './band.service'
import { FileModule } from '../file/file.module'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Band } from '../../model/band.entity'
import { JwtStrategy } from '../auth/strategies/jwtStrategy'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Band]),
    MulterModule,
    FileModule,
    forwardRef(() => UserModule),
  ],
  controllers: [BandController],
  providers: [BandService, JwtStrategy],
  exports: [BandService],
})
export class BandModule {}
