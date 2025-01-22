import { categoryMockData } from '../data';

export const MockCheckListService = () => ({
  removeCheckListsByIds: jest.fn().mockResolvedValue(true),
});
