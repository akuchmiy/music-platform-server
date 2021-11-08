import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  password: string

  @Column({ type: 'boolean', default: false })
  confirmed: boolean
}
