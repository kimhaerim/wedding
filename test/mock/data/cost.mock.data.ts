import { Category } from '../../../src/category/entity';
import { CheckList } from '../../../src/check-list/entity';
import { Cost } from '../../../src/cost/entity';
import { CostType } from '../../../src/cost/enum';

export const costMockData: Readonly<Cost> = Object.freeze<Cost>({
  id: 1,
  title: '비용',
  checkListId: 1,
  amount: 0,
  costType: CostType.BASE,
  isIncludeBudget: true,
  createdAt: new Date(),
  checkList: new CheckList(),
});
