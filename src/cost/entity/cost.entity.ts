import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
