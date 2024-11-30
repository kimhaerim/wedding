import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { IAddCost } from './interface';
import { CostRepository } from './repository';
import { CheckListService } from '../check-list/check-list.service';

@Injectable()
export class CostService {
  constructor(
    private readonly checkListService: CheckListService,
    private readonly costRepository: CostRepository,
  ) {}

  @Transactional()
  async addCost(args: IAddCost) {
    await this.checkListService.getCheckList(args.checkListId, args.coupleId);
    await this.costRepository.add(args);
    return true;
  }
}
