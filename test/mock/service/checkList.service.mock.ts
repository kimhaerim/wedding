import { categoryMockData } from '../data';

export const MockCheckListService = () => ({
  getCheckList: jest.fn().mockResolvedValue(undefined),
  removeCheckListsByIds: jest.fn().mockResolvedValue(true),
});
