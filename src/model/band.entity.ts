import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Band {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string
}
