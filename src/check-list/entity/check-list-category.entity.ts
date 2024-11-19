import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CheckListCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('coupleId')
  @Column('int')
  coupleId: number;

  @Column('varchar', { length: 255 })
  category: string;

  @Column('int')
  budgetAmount: number;

  @CreateDateColumn()
  createdAt: Date;
}
