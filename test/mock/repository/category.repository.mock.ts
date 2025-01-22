export const MockCategoryRepository = () => ({
  getOneById: jest.fn().mockResolvedValue(undefined),
  getOneByTitleAndCoupleId: jest.fn().mockResolvedValue(null),
  getOneWithCheckLists: jest.fn().mockResolvedValue(undefined),
  getManyByCoupleId: jest.fn().mockResolvedValue([]),
  getTotalCategoryBudget: jest.fn().mockResolvedValue(undefined),
  getCategoryBudgetDetails: jest.fn().mockResolvedValue(undefined),
  add: jest.fn().mockResolvedValue([]),
  updateById: jest.fn().mockResolvedValue(true),
  removeById: jest.fn().mockResolvedValue(true),
});
