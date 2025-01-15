import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from '../../category/entity';
import { CheckList } from '../../check-list/entity';
import { CostType } from '../enum';

@Entity()
export class Cost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Index('categoryId')
  @Column('int', { nullable: true })
  categoryId?: number;

  @Index('checkListId')
  @Column('int', { nullable: true })
  checkListId?: number;

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

  @ManyToOne(() => Category, (category) => category.costs, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
