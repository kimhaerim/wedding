import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { CategoryReadService } from './category-read.service';
import { IAddCategories, IAddCategory, IUpdateCategory } from './interface';
import { CategoryRepository } from './repository';
import { CheckListService } from '../check-list/check-list.service';
import { filterValidFields } from '../common/util';
import { CostService } from '../cost/cost.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryReadService: CategoryReadService,
    private readonly checkListService: CheckListService,
    private readonly costService: CostService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  @Transactional()
  async addCategory(args: IAddCategory) {
    const category = await this.categoryRepository.getOneByTitleAndCoupleId(
      args.title,
      args.coupleId,
    );
    if (category) {
      throw new BadRequestException('이미 추가된 카테고리입니다.');
    }

    const result = await this.categoryRepository.add([args]);
    return result[0];
  }

  @Transactional()
  async addCategories(args: IAddCategories[], coupleId: number) {
    const addArgs = args.map((arg) => ({ ...arg, coupleId }));
    await this.categoryRepository.add(addArgs);
    return true;
  }

  async updateCategory(args: IUpdateCategory) {
    const { id, ...updateArgs } = args;
    await this.categoryReadService.getCategory(id, args.coupleId);
    const categoryUpdateArgs = filterValidFields(updateArgs);
    if (Object.keys(categoryUpdateArgs).length > 0) {
      await this.categoryRepository.updateById(id, updateArgs);
    }

    return true;
  }

  @Transactional()
  async removeCategoryById(id: number, coupleId: number) {
    const category = await this.categoryRepository.getOneWithCheckLists(id);
    if (category?.coupleId !== coupleId) {
      throw new ForbiddenException('권한이 없는 카테고리입니다.');
    }

    const checkListIds = category.checkList?.map((data) => data.id);
    if (checkListIds?.length) {
      await this.checkListService.removeCheckLists(checkListIds);
    }

    const costIds = category.checkList?.flatMap((data) =>
      data.costs?.map((cost) => cost.id),
    );
    if (costIds?.length) {
      await this.costService.removeCostsByIds(costIds);
    }

    await this.categoryRepository.removeById(id);
    return true;
  }
}
