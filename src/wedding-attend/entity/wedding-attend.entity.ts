import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WeddingAttend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  weddingInvitationId: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 255 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
