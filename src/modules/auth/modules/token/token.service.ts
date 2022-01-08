import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Token } from '../../../../model/token.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../../../model/user.entity'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>
  ) {}

  async findOne(userId: string): Promise<Token> {
    const token = await this.tokenRepository.findOne(userId)
    if (!token) throw new BadRequestException('Token does not exist')

    return token
  }

  async compareToken(user: User, refreshToken: string) {
    const token = await this.findOne(user.id)

    if (token.token !== refreshToken) throw new Error('Token comparison failed')
  }

  private async createToken(user: User, refreshToken: string) {
    const newToken = this.tokenRepository.create({
      user,
      token: refreshToken,
    })
    return this.tokenRepository.save(newToken)
  }

  async saveToken(user: User, refreshToken: string) {
    try {
      await this.findOne(user.id)
      await this.tokenRepository.update({ user }, { token: refreshToken })
    } catch (e) {
      await this.createToken(user, refreshToken)
    }
  }
}
