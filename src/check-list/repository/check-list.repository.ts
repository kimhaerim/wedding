import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CheckList } from '../entity';
import { IAdd } from './interface';

export class CheckListRepository {
  constructor(
    @InjectRepository(CheckList) private repository: Repository<CheckList>,
  ) {}

  async add(args: IAdd) {
    return this.repository.save(args);
  }
}
