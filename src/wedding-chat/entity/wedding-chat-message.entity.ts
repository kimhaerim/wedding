import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WeddingChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  uuid: string;

  @Index('weddingChatId')
  @Column('int')
  weddingChatId: number;

  @Index('userId')
  @Column('int', { nullable: true })
  userId?: number;

  @Column('varchar', { length: 255 })
  nickname: string;

  @Column('varchar', { length: 255 })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
