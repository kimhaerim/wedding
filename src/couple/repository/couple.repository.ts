import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Couple } from '../entity';
import { IAddCouple } from '../interface';
import { IUpdateById } from './interface';

export class CoupleRepository {
  constructor(
    @InjectRepository(Couple) private repository: Repository<Couple>,
  ) {}

  async getOneById(id: number): Promise<Couple> {
    return this.repository.findOneBy({ id });
  }

  async add(args: IAddCouple): Promise<Couple> {
    return this.repository.save(args);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected > 0 ? true : false;
  }
}
