import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Token {
  @OneToOne((type) => User, { primary: true })
  @JoinColumn()
  user: User

  @Column({ type: 'varchar', length: 300 })
  token: string
}
