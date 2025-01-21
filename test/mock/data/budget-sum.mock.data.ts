import { IGetBudgetSumOutput } from '../../../src/category/repository/interface';

export const budgetSumMockData: Readonly<IGetBudgetSumOutput> =
  Object.freeze<IGetBudgetSumOutput>({
    id: 1,
    budgetAmount: 0,
    totalCost: 0,
    paidCost: 0,
  });
