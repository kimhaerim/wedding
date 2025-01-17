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
import { CategoryService } from '../category/category.service';
import { CheckListService } from '../check-list/check-list.service';
import { filterValidFields } from '../common/util';

@Injectable()
export class CostService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly checkListService: CheckListService,
    private readonly costRepository: CostRepository,
  ) {}

  async getCost(id: number, coupleId: number) {
    const cost = await this.costRepository.getOneById(id);
    if (!cost) {
      throw new BadRequestException();
    }

    if (cost.checkListId) {
      await this.getCheckList(cost.checkListId, coupleId);
    }

    return cost;
  }

  async getCostsByCheckListId(checkListId: number) {
    return this.costRepository.getManyByCheckListId(checkListId);
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
    const { checkListId, categoryId, coupleId } = args;
    if (!checkListId && !categoryId) {
      throw new BadRequestException('카테고리는 필수입니다.');
    }

    if (checkListId) {
      await this.getCheckList(checkListId, coupleId);
    }

    if (categoryId) {
      await this.getCategory(categoryId, coupleId);
    }

    const result = await this.costRepository.add(args);
    return result.id;
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

  private getCategory(categoryId: number, coupleId: number) {
    return this.categoryService.getCategory(categoryId, coupleId);
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
