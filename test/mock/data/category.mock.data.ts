import { Category } from '../../../src/category/entity';

export const categoryMockData: Readonly<Category> = Object.freeze<Category>({
  id: 1,
  coupleId: 1,
  title: '카테고리',
  budgetAmount: 0,
  createdAt: new Date(),
  checkList: [],
});
