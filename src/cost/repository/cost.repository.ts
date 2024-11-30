import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cost } from '../entity';
import { IAdd } from './interface';

export class CostRepository {
  constructor(@InjectRepository(Cost) private repository: Repository<Cost>) {}

  async add(args: IAdd) {
    return this.repository.save(args);
  }
}
