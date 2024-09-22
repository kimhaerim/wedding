import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Couple {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', { nullable: true })
  weddingDate?: Date;

  @Column('date', { nullable: true })
  coupleStartDate?: string;

  @CreateDateColumn()
  createdAt: Date;
}
