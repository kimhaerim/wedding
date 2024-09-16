import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Relation } from '../enum';

@Entity()
export class UserFamily {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('userId')
  @Column('int')
  userId: number;

  @Column('enum', { enum: Relation })
  relation: Relation;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('boolean')
  isDecease: boolean;

  @Column('varchar', { length: 255, nullable: true })
  phoneNumber?: string;

  @Column('varchar', { length: 255, nullable: true })
  accountNumber?: string;

  @Column('varchar', { length: 255, nullable: true })
  bank?: string;

  @Column('varchar', { length: 255, nullable: true })
  accountHolder?: string;

  @CreateDateColumn()
  createdAt: Date;
}
