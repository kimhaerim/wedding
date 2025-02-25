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

  @Index('weddingInvitationId')
  @Column('int')
  weddingInvitationId: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 255 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
