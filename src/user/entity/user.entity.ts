import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('coupleId')
  @Column('int')
  coupleId: number;

  @Index('email', { unique: true })
  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255, nullable: true })
  password?: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('date', { nullable: true })
  birthday?: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;
}
