import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFamily } from '../entity';
import { IAdd } from './interface';
import { Relation } from '../enum';

export class UserFamilyRepository {
  constructor(
    @InjectRepository(UserFamily) private repository: Repository<UserFamily>,
  ) {}

  async getOneByUserIdAndRelation(userId: number, relation: Relation) {
    return this.repository.findOneBy({ userId, relation });
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }
}
