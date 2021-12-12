import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../model/user.entity'
import { UserController } from './user.controller'
import { JwtStrategy } from '../auth/strategies/jwtStrategy'
import { BandModule } from '../band/band.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), BandModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
