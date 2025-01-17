import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from '../../category/entity';
import { Cost } from '../../cost/entity';

@Entity()
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('coupleId')
  @Column('int')
  coupleId: number;

  @Index('categoryId')
  @Column('int')
  categoryId: number;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('datetime', { nullable: true })
  reservedDate?: Date;

  @Column('date', { nullable: true })
  completedAt?: string;

  @Column('varchar', { length: 255, nullable: true })
  memo?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.checkList, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Cost, (cost) => cost.checkList)
  costs: Cost[];
}
