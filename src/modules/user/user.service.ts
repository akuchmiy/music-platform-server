import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '../../model/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../../dtos/CreateUserDto'

export enum UserSearchBy {
  id = 'id',
  email = 'email',
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findOne(value: string, by: UserSearchBy): Promise<User> {
    return this.userRepository.findOne({ where: { [by]: value } })
  }

  async createOne(user: CreateUserDto): Promise<Partial<User>> {
    try {
      const newUser = await this.userRepository.create(user)
      await this.userRepository.save(newUser)

      const { password, ...rest } = newUser
      return rest
    } catch (e) {
      throw new BadRequestException({ message: 'This email is already in use' })
    }
  }
}
