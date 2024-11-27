import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFamily } from '../entity';
import { IAdd, IUpdateById } from './interface';
import { Relation } from '../enum';

export class UserFamilyRepository {
  constructor(
    @InjectRepository(UserFamily) private repository: Repository<UserFamily>,
  ) {}

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getOneByUserIdAndRelation(userId: number, relation: Relation) {
    return this.repository.findOneBy({ userId, relation });
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected > 0 ? true : false;
  }
}
