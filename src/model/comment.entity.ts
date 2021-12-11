import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Track } from './track.entity'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne((type) => User, (user) => user.id)
  user: User

  @ManyToOne((type) => Track, (track) => track.id)
  track: Track

  @Column({ type: 'varchar' })
  text: string

  @Column({ type: 'int', default: 0 })
  likes: number

  @Column({ type: 'int', default: 0 })
  dislikes: number
}
