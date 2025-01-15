import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Cost } from '../../cost/entity';

@Unique('title_couple_id', ['title', 'coupleId'])
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('coupleId')
  @Column('int')
  coupleId: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('int', { default: 0 })
  budgetAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Cost, (cost) => cost.category)
  costs: Cost[];
}
