import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Transactional } from 'typeorm-transactional';

import {
  IAddCost,
  ICostOutput,
  IGetDailyCheckListsByMonth,
  IUpdateCost,
} from './interface';
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

    const checkList = await this.checkListService
      .getCheckList(cost.checkListId, coupleId)
      .catch(() => undefined);

    if (!checkList) {
      throw new ForbiddenException();
    }

    return cost;
  }

  async getCostsByCheckListId(checkListId: number, coupleId: number) {
    return this.costRepository.getManyByCheckListId(checkListId, coupleId);
  }

  async getDailyCostsByMonth(args: IGetDailyCheckListsByMonth) {
    const { targetYear, targetMonth, coupleId } = args;
    const format = 'YYYY-MM-DD';
    const startDate = dayjs(`${targetYear}-${targetMonth}-1`).format(format);
    const endDate = dayjs(`${targetYear}-${targetMonth + 1}-1`).format(format);

    const costs = await this.costRepository.getMany({
      startDate,
      endDate,
      coupleId,
    });
    return costs.reduce(
      (acc: { paymentDate: string; costs: ICostOutput[] }[], cost) => {
        const paymentDate = dayjs(cost.paymentDate).format('YYYY-MM-DD');
        const found = acc.find((data) => data.paymentDate === paymentDate);
        if (found) {
          found.costs.push(cost);
        } else {
          acc.push({ paymentDate, costs: [cost] });
        }

        return acc;
      },
      [],
    );
  }

  @Transactional()
  async addCost(args: IAddCost) {
    const { checkListId, coupleId, ...addArgs } = args;
    const checkList = await this.checkListService
      .getCheckList(checkListId, coupleId)
      .catch(() => undefined);

    if (!checkList) {
      throw new ForbiddenException();
    }

    return this.costRepository.add({ ...addArgs, checkListId });
  }

  @Transactional()
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
    return this.costRepository.removeByIds([id]);
  }

  async removeCostsByIds(ids: number[]) {
    return this.costRepository.removeByIds(ids);
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
