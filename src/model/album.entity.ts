import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Band } from './band.entity'

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @ManyToOne((type) => Band, (band) => band.id)
  @JoinColumn()
  band: Band
}
