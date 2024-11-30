import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getCost(id: number, coupleId: number) {
    const cost = await this.costRepository.getOneById(id);
    if (!cost) {
      throw new BadRequestException();
    }

    await this.getCheckList(cost.checkListId, coupleId);
    return cost;
  }

  async getCostsByCheckListId(checkListId: number) {
    return this.costRepository.getManyByCheckListId(checkListId);
  }

  @Transactional()
  async addCost(args: IAddCost) {
    await this.getCheckList(args.checkListId, args.coupleId);
    await this.costRepository.add(args);
    return true;
  }

  private getCheckList(checkListId: number, coupleId: number) {
    return this.checkListService.getCheckList(checkListId, coupleId);
  }
}
