import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { IAddCost, IUpdateCost } from './interface';
import { CostRepository } from './repository';
import { CheckListService } from '../check-list/check-list.service';
import { filterValidFields } from '../common/util';

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

  async updateCost(args: IUpdateCost) {
    const { id, coupleId, ...updateArgs } = args;
    await this.verifyCostWithCheckList(id, coupleId);

    const costUpdateArgs = filterValidFields(updateArgs);
    if (Object.keys(costUpdateArgs).length > 0) {
      await this.costRepository.updateById(id, updateArgs);
    }

    return true;
  }

  @Transactional()
  async removeCost(id: number, coupleId: number) {
    await this.verifyCostWithCheckList(id, coupleId);
    return this.costRepository.removeById(id);
  }

  private getCheckList(checkListId: number, coupleId: number) {
    return this.checkListService.getCheckList(checkListId, coupleId);
  }

  private async verifyCostWithCheckList(id: number, coupleId: number) {
    const costWithCheckList = await this.costRepository.getOneWithCheckListById(
      id,
    );
    if (!costWithCheckList) {
      throw new BadRequestException();
    }

    if (costWithCheckList.checkList.coupleId !== coupleId) {
      throw new ForbiddenException();
    }
  }
}
