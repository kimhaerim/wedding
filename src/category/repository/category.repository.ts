import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entity';
import { IAdd } from './interface';

export class CategoryRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getOneByCategoryAndCoupleId(title: string, coupleId: number) {
    return this.repository.findOneBy({ title, coupleId });
  }

  async getManyByCoupleId(coupleId: number) {
    return this.repository.findBy({ coupleId });
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }
}
