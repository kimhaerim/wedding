export const MockCostRepository = () => ({
  getOneById: jest.fn().mockResolvedValue(undefined),
  getManyByCheckListId: jest.fn().mockResolvedValue([]),
  getMany: jest.fn().mockResolvedValue([]),
  add: jest.fn().mockResolvedValue(1),
  updateById: jest.fn().mockResolvedValue(true),
  removeByIds: jest.fn().mockResolvedValue(true),
});
