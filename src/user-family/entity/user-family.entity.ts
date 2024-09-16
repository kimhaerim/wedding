// user_family {
// 	int id PK
// 	int userId FK
// 	enum parents "FATHER | MOTHER"
// 	varchar name
// 	boolean isDecease
// 	varchar phoneNumber "NULL) 암호화"
// 	varchar accountnummer "NULL) 암호화"
// 	varchar bank "NULL) 은행명"
// 	varhcar accountHolder "NULL) 예금주"
// 	DATETIME createdAt
// }

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
