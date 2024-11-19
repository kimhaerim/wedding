import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FileTarget } from '../enum';

@Entity()
export class file {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('weddingInvitationId')
  @Column('int', { nullable: true })
  weddingInvitationId?: number;

  @Index('coupleId')
  @Column('int')
  coupleId: number;

  @Column('varchar', { length: 255 })
  target: FileTarget;

  @Column('varchar', { length: 255 })
  path: string;

  @Column('int', { default: 0 })
  sequence: number;

  @CreateDateColumn()
  createdAt: Date;
}
