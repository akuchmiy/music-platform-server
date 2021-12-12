import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Band } from './band.entity'
import { Album } from './album.entity'

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne((type) => Band, (band) => band.id)
  band: Band

  @ManyToOne((type) => Album, (album) => album.id)
  album: Album

  @Column({ type: 'varchar' })
  picture: string

  @Column({ type: 'varchar' })
  audio: string

  @Column({ type: 'varchar' })
  text: string

  @Column({ type: 'int' })
  listens: number
}
