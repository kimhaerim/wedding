import { categoryMockData } from '../data';

export const MockCostService = () => ({
  removeCostsByIds: jest.fn().mockResolvedValue(true),
});
