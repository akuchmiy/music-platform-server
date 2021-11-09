import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Token } from '../../model/token.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../model/user.entity'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>
  ) {}

  async findOne(userId: string) {
    return await this.tokenRepository.findOne(userId)
  }

  async compareToken(user: User, refreshToken: string) {
    const token = await this.findOne(user.id)
    if (token) {
      return token.token === refreshToken
    }
    return false
  }

  private async createToken(user: User, refreshToken: string) {
    const newToken = this.tokenRepository.create({
      user,
      token: refreshToken,
    })
    return await this.tokenRepository.save(newToken)
  }

  async saveToken(user: User, refreshToken: string) {
    const token = await this.findOne(user.id)

    try {
      if (!token) {
        await this.createToken(user, refreshToken)
      } else {
        await this.tokenRepository.update({ user }, { token: refreshToken })
      }
    } catch (e) {
      throw new InternalServerErrorException({
        message: 'Internal server error',
      })
    }
  }
}
