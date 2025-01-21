export const MockCategoryRepository = () => ({
  getOneById: jest.fn().mockResolvedValue(undefined),
  getManyByCoupleId: jest.fn().mockResolvedValue([]),
  getTotalCategoryBudget: jest.fn().mockResolvedValue(undefined),
  getCategoryBudgetDetails: jest.fn().mockResolvedValue(undefined),
});
