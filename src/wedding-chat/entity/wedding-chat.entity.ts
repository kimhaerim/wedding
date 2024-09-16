import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WeddingChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  uuid: string;

  @Index('weddingInvitationId')
  @Column('int')
  weddingInvitationId: number;

  @Index('userId')
  @Column('int', { nullable: true })
  userId?: number;

  @Column('varchar', { length: 255 })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
