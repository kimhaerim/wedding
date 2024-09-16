import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('weddingAttendId_uuid', ['weddingAttendId', 'uuid'])
@Unique('weddingAttendId_userId', ['weddingAttendId', 'userId'])
export class WeddingAttendAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('weddingAttendId')
  @Column('int')
  weddingAttendId: number;

  @Column('varchar', { length: 255 })
  uuid: string;

  @Column('varchar', { length: 255, nullable: true })
  userId?: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('boolean')
  isAttend: boolean;

  @Column('int')
  peopleCount: number;

  @CreateDateColumn()
  createdAt: Date;
}
