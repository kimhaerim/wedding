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

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('datetime', { nullable: true })
  birthday?: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;
}
