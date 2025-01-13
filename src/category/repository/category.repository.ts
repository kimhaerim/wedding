import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entity';
import { IAdd, IUpdateById } from './interface';

export class CategoryRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getOneByTitleAndCoupleId(title: string, coupleId: number) {
    return this.repository.findOneBy({ title, coupleId });
  }

  async getManyByCoupleId(args: {
    coupleId: number;
    offset: number;
    limit: number;
  }) {
    return this.repository.find({
      where: { coupleId: args.coupleId },
      skip: args.offset,
      take: args.limit,
    });
  }

  async add(args: IAdd[]) {
    const insertResult = await this.repository.insert(args);
    return insertResult.identifiers.map((data) => data.id);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected > 0 ? true : false;
  }
}
