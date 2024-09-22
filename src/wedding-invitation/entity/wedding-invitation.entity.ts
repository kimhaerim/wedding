import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class weddingInvitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('coupleId')
  @Column('int')
  coupleId: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('varchar', { length: 255, nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt: Date;
}
