import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Band } from './band.entity'
import { Track } from './track.entity'

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar' })
  picture: string

  @ManyToOne((type) => Band, (band) => band.id)
  @JoinColumn()
  band: Band

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[]
}
