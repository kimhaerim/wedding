import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CheckList } from '../../check-list/entity';
import { CostType } from '../enum';

@Entity()
export class Cost {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('checkListId')
  @Column('int')
  checkListId: number;

  @Column('int')
  amount: number;

  @Column('date', { nullable: true })
  paymentDate?: Date;

  @Column('varchar', { length: 255, nullable: true })
  memo?: string;

  @Column('enum', { enum: CostType, default: CostType.BASE })
  costType: CostType;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => CheckList, (checkList) => checkList.costs, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'checkListId' })
  checkList: CheckList;
}
