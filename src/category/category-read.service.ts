import { ForbiddenException, Injectable } from '@nestjs/common';

import { IGetTotalCategoryBudget } from './interface';
import { CategoryRepository } from './repository';
import { IGetBudgetSumOutput, IGetCategories } from './repository/interface';
import { getDateRange } from '../common/util';

@Injectable()
export class CategoryReadService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategory(id: number, coupleId: number) {
    const category = await this.categoryRepository.getOneById(id);
    if (category?.coupleId !== coupleId) {
      throw new ForbiddenException('권한이 없는 카테고리입니다.');
    }

    return category;
  }

  async getCategories(args: IGetCategories) {
    return this.categoryRepository.getManyByCoupleId(args);
  }

  async getTotalCategoryBudget(args: IGetTotalCategoryBudget) {
    const { coupleId, targetYear, targetMonth } = args;
    const dateRange = getDateRange(targetYear, targetMonth);
    const categoryBudget = await this.categoryRepository.getTotalCategoryBudget(
      {
        coupleId,
        ...dateRange,
      },
    );

    return categoryBudget
      ? this.convertCategoryToCategoryBudgetDetail(categoryBudget)
      : undefined;
  }

  async getCategoryBudgetDetails(id: number, coupleId: number) {
    const categoryBudget =
      await this.categoryRepository.getCategoryBudgetDetails({
        id,
        coupleId,
      });

    return categoryBudget
      ? this.convertCategoryToCategoryBudgetDetail(categoryBudget)
      : undefined;
  }

  private convertCategoryToCategoryBudgetDetail(
    categoryBudget: IGetBudgetSumOutput,
  ) {
    return {
      ...categoryBudget,
      remainingBudget: categoryBudget.budgetAmount - categoryBudget.totalCost,
      unpaidCost: categoryBudget.totalCost - categoryBudget.paidCost,
    };
  }
}
