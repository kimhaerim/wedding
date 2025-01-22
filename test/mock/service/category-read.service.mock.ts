import { categoryMockData } from '../data';

export const MockCategoryReadService = () => ({
  getCategory: jest.fn().mockResolvedValue(categoryMockData),
  getCategories: jest.fn().mockResolvedValue([categoryMockData]),
  getTotalCategoryBudget: jest.fn().mockResolvedValue(undefined),
  getCategoryBudgetDetails: jest.fn().mockResolvedValue(undefined),
});
