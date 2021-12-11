import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateUserDto } from '../dtos/CreateUserDto'

@Injectable()
export class userValidationPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    const exception = new BadRequestException('Validation failed')
    if (!value.email || !value.password) throw exception

    const correct = isValidEmail(value.email) && isValidPassword(value.password)
    if (!correct) {
      throw exception
    }
    return value
  }
}

function isValidEmail(email: string): boolean {
  return email.search(/^[^@]+@[^@]+\.[^@]+$/) !== -1
}

function isValidPassword(password: string): boolean {
  return (
    password.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) !== -1
  )
}
