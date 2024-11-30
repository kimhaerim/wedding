import { ForbiddenException, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

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
import { CategoryService } from '../category/category.service';
import { filterValidFields } from '../common/util';

@Injectable()
export class CheckListService {
  constructor(
    private readonly categoryService: CategoryService,
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

  async getDailyCheckListsByMonth(args: IGetDailyCheckListsByMonth) {
    const dateRange = this.getDateRange(args.targetYear, args.targetMonth);
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
    const dateRange = this.getDateRange(targetYear, targetMonth);
    return this.checkListRepository.getCount({ ...dateRange, coupleId });
  }

  private getDateRange(targetYear?: number, targetMonth?: number) {
    if (!targetYear || !targetMonth) {
      return { startDate: undefined, endDate: undefined };
    }

    const format = 'YYYY-MM-DD';
    const startDate = dayjs(`${targetYear}-${targetMonth}-1`).format(format);
    const endDate = dayjs(`${targetYear}-${targetMonth + 1}-1`).format(format);
    return { startDate, endDate };
  }

  async addCheckList(args: IAddCheckList) {
    await this.checkListRepository.add(args);
    return true;
  }

  async updateCheckList(args: IUpdateCheckList) {
    const { id, ...updateArgs } = args;
    const checkList = await this.checkListRepository.getOneById(id);
    if (checkList?.coupleId !== args.coupleId) {
      throw new ForbiddenException('수정 권한이 없는 체크리스트입니다.');
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

    await this.categoryService.getCategory(categoryId, coupleId);

    await this.checkListRepository.updateCategoryIdByIds(
      checkListIds,
      categoryId,
    );
    return true;
  }

  async removeCheckList(id: number, coupleId: number) {
    const checkList = await this.checkListRepository.getOneById(id);
    if (checkList.coupleId !== coupleId) {
      throw new ForbiddenException('삭제 권한이 없는 체크리스트입니다.');
    }

    return this.checkListRepository.removeByIds([id]);
  }

  async removeCheckListsByCategoryId(categoryId: number, coupleId: number) {
    const checkLists = await this.getCheckListByCategoryId(
      categoryId,
      coupleId,
    );

    if (checkLists.length === 0) {
      return true;
    }

    const ids = checkLists.map((checkList) => checkList.id);
    return this.checkListRepository.removeByIds(ids);
  }
}
