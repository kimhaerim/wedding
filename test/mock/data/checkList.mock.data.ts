import { Category } from '../../../src/category/entity';
import { CheckList } from '../../../src/check-list/entity';

export const checkListMockData: Readonly<CheckList> = Object.freeze<CheckList>({
  id: 1,
  coupleId: 1,
  description: '체크리스트',
  categoryId: 1,
  createdAt: new Date(),
  category: new Category(),
  costs: [],
});
