import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '../../model/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../../dtos/CreateUserDto'

interface FindUserOptions {
  id?: string
  email?: string
  confirmed?: string
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findOne(options: FindUserOptions): Promise<User> {
    const user = await this.userRepository.findOne({ where: options })
    if (!user) throw new BadRequestException('User does not exist')

    return user
  }

  async updateOne(userId: string, user: Partial<User>) {
    return this.userRepository.update(userId, user)
  }

  async createOne(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(user)
      await this.userRepository.save(newUser)

      return newUser
    } catch (e) {
      throw new BadRequestException({ message: 'This email is already in use' })
    }
  }
}
