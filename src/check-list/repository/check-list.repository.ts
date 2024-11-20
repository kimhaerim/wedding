import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CheckList } from '../entity';

export class CheckListRepository {
  constructor(
    @InjectRepository(CheckList) private repository: Repository<CheckList>,
  ) {}
}
