import { ForbiddenException, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Transactional } from 'typeorm-transactional';

import { CheckList } from './entity';
import {
  IAddCheckList,
  ICheckListOutput,
  IDailyCheckListsByMonthOutput,
  IGetCheckListCount,
  IGetCheckLists,
  IGetDailyCheckListsByMonth,
  IUpdateCategoryIdForCheckLists,
  IUpdateCheckList,
} from './interface';
import { CheckListRepository } from './repository';
import { CategoryReadService } from '../category/category-read.service';
import { filterValidFields, getDateRange } from '../common/util';

@Injectable()
export class CheckListService {
  constructor(
    private readonly categoryReadService: CategoryReadService,
    private readonly checkListRepository: CheckListRepository,
  ) {}

  async getCheckList(id: number, coupleId: number) {
    const checkList = await this.checkListRepository.getOneById(id);
    if (checkList?.coupleId !== coupleId) {
      throw new ForbiddenException('권한이 없는 체크리스트입니다.');
    }

    return this.convertCheckListToOutput(checkList);
  }

  async getCheckLists(args: IGetCheckLists) {
    const checkLists = await this.checkListRepository.getMany(args);

    return checkLists.map((checkList) =>
      this.convertCheckListToOutput(checkList),
    );
  }

  async getCategoryByCheckList(id: number, coupleId: number) {
    const checkList = await this.checkListRepository.getOneById(id);
    if (!checkList) {
      return undefined;
    }

    return this.categoryReadService.getCategory(checkList.categoryId, coupleId);
  }

  async getDailyCheckListsByMonth(args: IGetDailyCheckListsByMonth) {
    const dateRange = getDateRange(args.targetYear, args.targetMonth);
    const checkLists = await this.checkListRepository.getMany({
      ...args,
      ...dateRange,
    });

    const convertedCheckLists = checkLists.map((checkList) =>
      this.convertCheckListToOutput(checkList),
    );

    return convertedCheckLists.reduce(
      (acc: IDailyCheckListsByMonthOutput[], checkList: ICheckListOutput) => {
        const reservedDate = dayjs(checkList.reservedDate).format('YYYY-MM-DD');

        const found = acc.find((data) => data.reservedDate === reservedDate);
        if (found) {
          found.checkLists.push(checkList);
        } else {
          acc.push({ reservedDate, checkLists: [checkList] });
        }

        return acc;
      },
      [],
    );
  }

  async getCheckListByCategoryId(categoryId: number, coupleId: number) {
    const checkLists = await this.checkListRepository.getManyByCategoryId(
      categoryId,
      coupleId,
    );
    return checkLists.map((checkList) =>
      this.convertCheckListToOutput(checkList),
    );
  }

  private convertCheckListToOutput(checkList: CheckList): ICheckListOutput {
    return { ...checkList, isCompleted: checkList.completedAt ? true : false };
  }

  async getCheckListCount(args: IGetCheckListCount) {
    const { targetYear, targetMonth, coupleId } = args;
    const dateRange = getDateRange(targetYear, targetMonth);
    return this.checkListRepository.getCount({ ...dateRange, coupleId });
  }

  @Transactional()
  async addCheckList(args: IAddCheckList) {
    const category = await this.categoryReadService
      .getCategory(args.categoryId, args.coupleId)
      .catch(() => undefined);
    if (!category) {
      throw new ForbiddenException('권한이 없는 카테고리입니다.');
    }

    const result = await this.checkListRepository.add(args);
    return result.id;
  }

  @Transactional()
  async updateCheckList(args: IUpdateCheckList) {
    const { id, ...updateArgs } = args;
    const checkList = await this.checkListRepository.getOneById(id);
    if (checkList?.coupleId !== args.coupleId) {
      throw new ForbiddenException('수정 권한이 없는 체크리스트입니다.');
    }

    if (args.categoryId) {
      const category = await this.categoryReadService
        .getCategory(args.categoryId, args.coupleId)
        .catch(() => undefined);
      if (!category) {
        throw new ForbiddenException('권한이 없는 카테고리입니다.');
      }
    }

    const checkListUpdateArgs = filterValidFields(updateArgs);
    if (Object.keys(checkListUpdateArgs).length > 0) {
      await this.checkListRepository.updateById(id, updateArgs);
    }

    return true;
  }

  async updateCategoryIdForCheckLists(args: IUpdateCategoryIdForCheckLists) {
    const { coupleId, checkListIds, categoryId } = args;
    const checkLists = await this.checkListRepository.getManyByIdsAndCoupleId(
      checkListIds,
      coupleId,
    );
    if (checkLists.length !== checkListIds.length) {
      throw new ForbiddenException('수정 권한이 없는 체크리스트가 있습니다.');
    }

    const category = await this.categoryReadService
      .getCategory(args.categoryId, args.coupleId)
      .catch(() => undefined);
    if (!category) {
      throw new ForbiddenException('권한이 없는 카테고리입니다.');
    }

    await this.checkListRepository.updateCategoryIdByIds(
      checkListIds,
      categoryId,
    );
    return true;
  }

  @Transactional()
  async removeCheckList(id: number, coupleId: number) {
    const checkList = await this.checkListRepository.getOneWithCost(id);
    if (checkList?.coupleId !== coupleId) {
      throw new ForbiddenException('삭제 권한이 없는 체크리스트입니다.');
    }

    const costIds = checkList.costs.map((cost) => cost.id);
    if (costIds.length) {
      // 비용삭제
    }

    await this.checkListRepository.removeByIds([id]);
    return true;
  }

  async removeCheckListsByIds(ids: number[]) {
    return this.checkListRepository.removeByIds(ids);
  }
}
