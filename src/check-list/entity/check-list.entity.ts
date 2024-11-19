import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CheckListStatus } from '../enum';

@Entity()
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('checkListCategoryId')
  @Column('int')
  checkListCategoryId: number;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('datetime', { nullable: true })
  reservedDate?: Date;

  @Column('date', { nullable: true })
  completedAt?: string;

  @Column('varchar', { length: 255, nullable: true })
  memo?: string;

  @Column('enum', { enum: CheckListStatus, nullable: true })
  status?: CheckListStatus;

  @CreateDateColumn()
  createdAt: Date;
}
