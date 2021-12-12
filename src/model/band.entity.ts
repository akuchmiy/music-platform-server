import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { User } from './user.entity'
import { Album } from './album.entity'

@Entity()
export class Band {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string

  @Column({ type: 'varchar', length: 300 })
  description: string

  @Column({ type: 'varchar' })
  picture: string

  @ManyToOne(() => User, (user) => user.id)
  creator: User

  @OneToMany(() => Album, (album) => album.band)
  albums: Album[]
}
